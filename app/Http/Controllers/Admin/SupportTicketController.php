<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SupportTicket;
use App\Models\SupportTicketReply;
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

    public function show(SupportTicket $ticket)
    {
        $ticket->load(['tenant', 'replies.user']);

        return response()->json([
            'id' => 'TKT-' . str_pad($ticket->id, 3, '0', STR_PAD_LEFT),
            'raw_id' => $ticket->id,
            'subject' => $ticket->subject,
            'message' => $ticket->message,
            'tenant' => $ticket->tenant->business_name,
            'priority' => $ticket->priority,
            'status' => $ticket->status,
            'date' => $ticket->created_at->format('d M Y'),
            'replies' => $ticket->replies->map(fn($r) => [
                'id' => $r->id,
                'message' => $r->message,
                'user' => $r->user?->name ?? 'System',
                'is_admin' => $r->is_admin,
                'date' => $r->created_at->format('d M Y H:i'),
            ]),
        ]);
    }

    public function storeReply(Request $request, SupportTicket $ticket)
    {
        $validated = $request->validate([
            'message' => 'required|string',
            'status' => 'nullable|in:open,in_progress,resolved,closed',
        ]);

        $reply = SupportTicketReply::create([
            'support_ticket_id' => $ticket->id,
            'user_id' => auth()->id(),
            'message' => $validated['message'],
            'is_admin' => true,
        ]);

        if (isset($validated['status'])) {
            $ticket->update(['status' => $validated['status']]);
        } else {
            // Auto update to in_progress if currently open
            if ($ticket->status === 'open') {
                $ticket->update(['status' => 'in_progress']);
            }
        }

        ActivityLog::log('reply_ticket', "Replied to ticket #{$ticket->id}", $ticket);

        return back()->with('success', 'Balasan berhasil dikirim.');
    }
}
