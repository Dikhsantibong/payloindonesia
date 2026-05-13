<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use App\Models\ActivityLog;
use App\Models\SubscriptionPlan;
use App\Models\Subscription;
use App\Models\TenantUser;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TenantController extends Controller
{
    public function index(Request $request)
    {
        $query = Tenant::with(['users', 'activeSubscription.plan']);

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('business_name', 'like', "%{$search}%")
                  ->orWhere('domain', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($status = $request->input('status')) {
            if ($status !== 'all') {
                $query->where('status', $status);
            }
        }

        $tenants = $query->latest()->paginate(10)->through(fn(Tenant $t) => [
            'id' => $t->id,
            'name' => $t->business_name,
            'slug' => $t->slug,
            'domain' => $t->domain,
            'email' => $t->email,
            'phone' => $t->phone,
            'status' => $t->status,
            'plan' => $t->activeSubscription?->plan?->name ?? 'No Plan',
            'users_count' => $t->users->count(),
            'date' => $t->created_at->format('d M Y'),
            'trial_ends_at' => $t->trial_ends_at?->format('d M Y'),
            'owner' => $t->users->firstWhere('role', 'owner')?->name ?? '-',
        ]);

        $plans = SubscriptionPlan::where('is_active', true)->get(['id', 'name', 'price']);

        return Inertia::render('admin/tenants', [
            'tenants' => $tenants,
            'plans' => $plans,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'business_name' => 'required|string|max:255',
            'email' => 'required|email|unique:tenants,email',
            'phone' => 'nullable|string|max:20',
            'plan_id' => 'required|exists:subscription_plans,id',
            'owner_name' => 'required|string|max:255',
            'owner_email' => 'required|email',
        ]);

        $slug = Str::slug($validated['business_name']);
        $domain = $slug . '.paylo.id';

        $tenant = Tenant::create([
            'business_name' => $validated['business_name'],
            'slug' => $slug,
            'domain' => $domain,
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'status' => 'trial',
            'subscription_status' => 'trial',
            'trial_ends_at' => now()->addDays(14),
        ]);

        // Create owner user
        TenantUser::create([
            'tenant_id' => $tenant->id,
            'name' => $validated['owner_name'],
            'email' => $validated['owner_email'],
            'password' => bcrypt('password'),
            'role' => 'owner',
            'status' => 'active',
        ]);

        // Create subscription
        $plan = SubscriptionPlan::find($validated['plan_id']);
        Subscription::create([
            'tenant_id' => $tenant->id,
            'subscription_plan_id' => $plan->id,
            'start_date' => now(),
            'end_date' => now()->addDays($plan->duration_days),
            'status' => 'active',
            'payment_status' => 'pending',
        ]);

        ActivityLog::log('create_tenant', "Created tenant: {$tenant->business_name}", $tenant);

        return back()->with('success', 'Tenant berhasil dibuat.');
    }

    public function update(Request $request, Tenant $tenant)
    {
        $validated = $request->validate([
            'business_name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email',
            'phone' => 'nullable|string|max:20',
            'status' => 'sometimes|in:active,suspended,inactive,trial',
        ]);

        $tenant->update($validated);

        ActivityLog::log('update_tenant', "Updated tenant: {$tenant->business_name}", $tenant);

        return back()->with('success', 'Tenant berhasil diperbarui.');
    }

    public function suspend(Tenant $tenant)
    {
        $tenant->update(['status' => 'suspended']);
        ActivityLog::log('suspend_tenant', "Suspended tenant: {$tenant->business_name}", $tenant);
        return back()->with('success', 'Tenant berhasil disuspend.');
    }

    public function activate(Tenant $tenant)
    {
        $tenant->update(['status' => 'active', 'subscription_status' => 'active']);
        ActivityLog::log('activate_tenant', "Activated tenant: {$tenant->business_name}", $tenant);
        return back()->with('success', 'Tenant berhasil diaktifkan.');
    }

    public function destroy(Tenant $tenant)
    {
        ActivityLog::log('delete_tenant', "Deleted tenant: {$tenant->business_name}");
        $tenant->delete();
        return back()->with('success', 'Tenant berhasil dihapus.');
    }

    public function show(Tenant $tenant)
    {
        $tenant->load(['users', 'activeSubscription.plan', 'subscriptions.plan', 'tickets']);

        return response()->json([
            'id' => $tenant->id,
            'name' => $tenant->business_name,
            'domain' => $tenant->domain,
            'email' => $tenant->email,
            'phone' => $tenant->phone,
            'status' => $tenant->status,
            'plan' => $tenant->activeSubscription?->plan?->name ?? 'No Plan',
            'plan_price' => $tenant->activeSubscription?->plan?->price ?? 0,
            'users_count' => $tenant->users->count(),
            'tickets_count' => $tenant->tickets->count(),
            'owner' => $tenant->users->firstWhere('role', 'owner'),
            'subscription' => $tenant->activeSubscription,
            'created_at' => $tenant->created_at->format('d M Y'),
            'trial_ends_at' => $tenant->trial_ends_at?->format('d M Y'),
            'trial_remaining' => $tenant->trialDaysRemaining(),
        ]);
    }
}
