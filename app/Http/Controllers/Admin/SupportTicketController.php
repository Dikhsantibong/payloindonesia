<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SupportTicket;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupportTicketController extends Controller
{
    public function index(Request $request)
    {
        $query = SupportTicket::with('tenant');

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('subject', 'like', "%{$search}%")
                  ->orWhereHas('tenant', fn($tq) => $tq->where('business_name', 'like', "%{$search}%"));
            });
        }

        if ($status = $request->input('status')) {
            if ($status !== 'all') {
                $query->where('status', $status);
            }
        }

        if ($priority = $request->input('priority')) {
            if ($priority !== 'all') {
                $query->where('priority', $priority);
            }
        }

        $tickets = $query->latest()->paginate(15)->through(fn(SupportTicket $t) => [
            'id' => 'TKT-' . str_pad($t->id, 3, '0', STR_PAD_LEFT),
            'raw_id' => $t->id,
            'subject' => $t->subject,
            'tenant' => $t->tenant->business_name,
            'priority' => $t->priority,
            'status' => $t->status,
            'date' => $t->created_at->format('d M Y'),
            'lastReply' => $t->updated_at->diffForHumans(),
        ]);

        $counts = [
            'open' => SupportTicket::where('status', 'open')->count(),
            'in_progress' => SupportTicket::where('status', 'in_progress')->count(),
            'resolved' => SupportTicket::where('status', 'resolved')->count(),
        ];

        return Inertia::render('admin/support', [
            'tickets' => $tickets,
            'counts' => $counts,
            'filters' => $request->only(['search', 'status', 'priority']),
        ]);
    }

    public function updateStatus(Request $request, SupportTicket $ticket)
    {
        $validated = $request->validate([
            'status' => 'required|in:open,in_progress,resolved,closed',
        ]);

        $ticket->update($validated);
        ActivityLog::log('update_ticket', "Updated ticket #{$ticket->id} status to {$validated['status']}", $ticket);

        return back()->with('success', 'Status tiket berhasil diperbarui.');
    }
}
