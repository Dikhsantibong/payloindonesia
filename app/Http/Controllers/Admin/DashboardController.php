<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use App\Models\Subscription;
use App\Models\SubscriptionPlan;
use App\Models\SupportTicket;
use App\Models\TenantUser;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalTenants = Tenant::count();
        $activeTenants = Tenant::where('status', 'active')->count();
        $trialTenants = Tenant::where('status', 'trial')->count();
        $totalUsers = TenantUser::count();

        // Monthly revenue from active subscriptions
        $monthlyRevenue = Subscription::where('status', 'active')
            ->join('subscription_plans', 'subscriptions.subscription_plan_id', '=', 'subscription_plans.id')
            ->sum('subscription_plans.price');

        // Tenant growth per month (last 12 months)
        $tenantGrowth = Tenant::select(
            DB::raw("DATE_FORMAT(created_at, '%Y-%m') as month"),
            DB::raw('COUNT(*) as count')
        )
            ->where('created_at', '>=', now()->subMonths(12))
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        // Revenue growth per month
        $revenueGrowth = Subscription::select(
            DB::raw("DATE_FORMAT(subscriptions.created_at, '%Y-%m') as month"),
            DB::raw('SUM(subscription_plans.price) as revenue')
        )
            ->join('subscription_plans', 'subscriptions.subscription_plan_id', '=', 'subscription_plans.id')
            ->where('subscriptions.created_at', '>=', now()->subMonths(12))
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        // Recent tenants
        $recentTenants = Tenant::with(['users', 'activeSubscription.plan'])
            ->latest()
            ->limit(6)
            ->get()
            ->map(fn(Tenant $t) => [
                'id' => $t->id,
                'name' => $t->business_name,
                'domain' => $t->domain,
                'plan' => $t->activeSubscription?->plan?->name ?? 'No Plan',
                'status' => $t->status,
                'date' => $t->created_at->format('d M Y'),
                'users' => $t->users->count(),
            ]);

        // Trial monitoring
        $trialMonitor = Tenant::where('status', 'trial')
            ->whereNotNull('trial_ends_at')
            ->orderBy('trial_ends_at')
            ->limit(5)
            ->get()
            ->map(fn(Tenant $t) => [
                'name' => $t->business_name,
                'remaining' => $t->trialDaysRemaining(),
                'total' => 14,
                'plan' => $t->activeSubscription?->plan?->name ?? 'Trial',
            ]);

        // Active users per day this week
        $activeUsersWeekly = TenantUser::select(
            DB::raw("DAYOFWEEK(created_at) as day_num"),
            DB::raw('COUNT(*) as users')
        )
            ->where('created_at', '>=', now()->startOfWeek())
            ->groupBy('day_num')
            ->orderBy('day_num')
            ->get();

        $dayLabels = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
        $activeUsersData = collect(range(1, 7))->map(fn($d) => [
            'day' => $dayLabels[$d - 1],
            'users' => $activeUsersWeekly->firstWhere('day_num', $d)?->users ?? 0,
        ]);

        return Inertia::render('dashboard', [
            'stats' => [
                'totalTenants' => $totalTenants,
                'activeTenants' => $activeTenants,
                'trialTenants' => $trialTenants,
                'monthlyRevenue' => $monthlyRevenue,
                'totalUsers' => $totalUsers,
            ],
            'tenantGrowth' => $tenantGrowth,
            'revenueGrowth' => $revenueGrowth,
            'recentTenants' => $recentTenants,
            'trialMonitor' => $trialMonitor,
            'activeUsersData' => $activeUsersData,
        ]);
    }
}
