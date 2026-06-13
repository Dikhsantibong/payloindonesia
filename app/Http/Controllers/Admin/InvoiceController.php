<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Models\Tenant;
use App\Models\ActivityLog;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class InvoiceController extends Controller
{
    public function index(Request $request)
    {
        $query = Invoice::with(['tenant', 'items']);

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('invoice_number', 'like', "%{$search}%")
                  ->orWhereHas('tenant', function ($tq) use ($search) {
                      $tq->where('business_name', 'like', "%{$search}%");
                  });
            });
        }

        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        $invoices = $query->latest()->paginate(10)->withQueryString();

        $tenants = Tenant::with(['activeSubscription.plan'])
            ->select('id', 'business_name')
            ->orderBy('business_name')
            ->get();

        // Summary stats
        $stats = [
            'total' => Invoice::count(),
            'paid' => Invoice::where('status', 'paid')->count(),
            'unpaid' => Invoice::whereIn('status', ['sent', 'overdue'])->count(),
            'total_revenue' => Invoice::where('status', 'paid')->sum('total'),
        ];

        return Inertia::render('admin/invoices', [
            'invoices' => $invoices,
            'tenants' => $tenants,
            'stats' => $stats,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function create()
    {
        $tenants = Tenant::with(['activeSubscription.plan'])
            ->select('id', 'business_name')
            ->orderBy('business_name')
            ->get();

        return Inertia::render('admin/invoice-create', [
            'tenants' => $tenants,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'subscription_id' => 'nullable|exists:subscriptions,id',
            'issue_date' => 'required|date',
            'due_date' => 'required|date|after_or_equal:issue_date',
            'billing_period_start' => 'nullable|date',
            'billing_period_end' => 'nullable|date|after_or_equal:billing_period_start',
            'tax_rate' => 'nullable|numeric|min:0|max:100',
            'notes' => 'nullable|string|max:1000',
            'items' => 'required|array|min:1',
            'items.*.description' => 'required|string|max:255',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
        ]);

        $invoice = Invoice::create([
            'invoice_number' => Invoice::generateNumber(),
            'tenant_id' => $validated['tenant_id'],
            'subscription_id' => $validated['subscription_id'] ?? null,
            'issue_date' => $validated['issue_date'],
            'due_date' => $validated['due_date'],
            'billing_period_start' => $validated['billing_period_start'] ?? null,
            'billing_period_end' => $validated['billing_period_end'] ?? null,
            'tax_rate' => $validated['tax_rate'] ?? 0,
            'notes' => $validated['notes'] ?? null,
            'status' => 'draft',
        ]);

        foreach ($validated['items'] as $item) {
            $amount = $item['quantity'] * $item['unit_price'];
            $invoice->items()->create([
                'description' => $item['description'],
                'quantity' => $item['quantity'],
                'unit_price' => $item['unit_price'],
                'amount' => $amount,
            ]);
        }

        $invoice->recalculate();

        ActivityLog::log(
            'created',
            "Membuat invoice baru: {$invoice->invoice_number}",
            $invoice
        );

        return redirect()->route('admin.invoices')->with('success', 'Invoice berhasil dibuat.');
    }

    public function updateStatus(Request $request, Invoice $invoice)
    {
        $validated = $request->validate([
            'status' => 'required|in:draft,sent,paid,overdue,cancelled',
        ]);

        $invoice->update([
            'status' => $validated['status'],
            'paid_at' => $validated['status'] === 'paid' ? now() : $invoice->paid_at,
        ]);

        ActivityLog::log(
            'updated',
            "Memperbarui status invoice {$invoice->invoice_number} menjadi {$validated['status']}",
            $invoice
        );

        return redirect()->back()->with('success', 'Status invoice berhasil diperbarui.');
    }

    public function destroy(Invoice $invoice)
    {
        $invoiceNumber = $invoice->invoice_number;
        $tenantName = $invoice->tenant->business_name;

        $invoice->delete();

        ActivityLog::log(
            'deleted',
            "Menghapus invoice {$invoiceNumber} milik tenant {$tenantName}"
        );

        return redirect()->back()->with('success', 'Invoice berhasil dihapus.');
    }

    public function downloadPdf(Invoice $invoice)
    {
        $invoice->load(['tenant', 'items']);

        // Load settings with defaults
        $settings = Setting::all()->pluck('value', 'key')->toArray();
        $defaults = [
            'app_name' => 'Paylo',
            'support_email' => 'support@paylo.id',
            'support_phone' => '+62 800 1234 5678',
            'bank_name' => 'BANK SULTRA',
            'bank_account_number' => '205.01.04.000531',
            'bank_account_name' => 'PT KREATIF TEKNOLOGI MAJU BERSAMA',
            'signature_name' => 'Administrator',
        ];
        $settings = array_merge($defaults, $settings);

        $pdf = Pdf::loadView('pdf.invoice', compact('invoice', 'settings'));

        return $pdf->stream("Invoice-{$invoice->invoice_number}.pdf");
    }
}
