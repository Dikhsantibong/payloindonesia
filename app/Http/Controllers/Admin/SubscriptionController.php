<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Subscription;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubscriptionController extends Controller
{
    public function index(Request $request)
    {
        $query = Subscription::with(['tenant', 'plan']);

        // Search by tenant name or domain
        if ($request->filled('search')) {
            $search = $request->search;
            $query->whereHas('tenant', function ($q) use ($search) {
                $q->where('business_name', 'like', "%{$search}%")
                  ->orWhere('domain', 'like', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Filter by plan
        if ($request->filled('plan') && $request->plan !== 'all') {
            $query->where('subscription_plan_id', $request->plan);
        }

        $subscriptions = $query->latest()->paginate(10)->withQueryString();

        $plans = \App\Models\SubscriptionPlan::select('id', 'name')->get();

        return Inertia::render('admin/subscriptions', [
            'subscriptions' => $subscriptions,
            'plans' => $plans,
            'filters' => $request->only(['search', 'status', 'plan']),
        ]);
    }

    public function updateStatus(Request $request, Subscription $subscription)
    {
        $validated = $request->validate([
            'status' => 'required|in:active,trial,expired,cancelled',
            'payment_status' => 'required|in:paid,pending,failed',
        ]);

        $subscription->update($validated);

        // Optional: Update tenant status if subscription is cancelled/expired
        if (in_array($validated['status'], ['expired', 'cancelled'])) {
            $subscription->tenant()->update(['status' => 'inactive']);
        } elseif ($validated['status'] === 'active') {
            $subscription->tenant()->update(['status' => 'active']);
        }

        ActivityLog::log(
            'updated',
            "Memperbarui status langganan tenant {$subscription->tenant->business_name} menjadi {$validated['status']}",
            $subscription
        );

        return redirect()->back()->with('success', 'Status langganan berhasil diperbarui.');
    }
}
