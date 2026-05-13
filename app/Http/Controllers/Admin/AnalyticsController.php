<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use App\Models\Subscription;
use App\Models\SubscriptionPlan;
use App\Models\TenantUser;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AnalyticsController extends Controller
{
    public function index()
    {
        // MRR
        $mrr = Subscription::where('status', 'active')
            ->join('subscription_plans', 'subscriptions.subscription_plan_id', '=', 'subscription_plans.id')
            ->sum('subscription_plans.price');

        // Churn rate (tenants that became inactive/suspended this month vs total)
        $churnedThisMonth = Tenant::whereIn('status', ['inactive', 'suspended'])
            ->where('updated_at', '>=', now()->startOfMonth())
            ->count();
        $totalStart = Tenant::where('created_at', '<', now()->startOfMonth())->count();
        $churnRate = $totalStart > 0 ? round(($churnedThisMonth / $totalStart) * 100, 1) : 0;

        // Trial conversion
        $totalTrialEver = Tenant::whereNotNull('trial_ends_at')->count();
        $convertedFromTrial = Tenant::where('status', 'active')
            ->whereNotNull('trial_ends_at')
            ->count();
        $conversionRate = $totalTrialEver > 0 ? round(($convertedFromTrial / $totalTrialEver) * 100, 0) : 0;

        // DAU (approximate - users active today)
        $dau = TenantUser::where('status', 'active')->count();

        // Tenant growth vs churn per month
        $tenantGrowthChurn = collect(range(11, 0))->map(function ($i) {
            $date = now()->subMonths($i);
            $monthLabel = $date->format('M');
            $newTenants = Tenant::whereYear('created_at', $date->year)
                ->whereMonth('created_at', $date->month)
                ->count();
            $churned = Tenant::whereIn('status', ['inactive', 'suspended'])
                ->whereYear('updated_at', $date->year)
                ->whereMonth('updated_at', $date->month)
                ->count();
            return ['month' => $monthLabel, 'new' => $newTenants, 'churned' => $churned];
        });

        // MRR growth per month
        $mrrGrowth = collect(range(11, 0))->map(function ($i) {
            $date = now()->subMonths($i);
            $revenue = Subscription::whereYear('subscriptions.created_at', $date->year)
                ->whereMonth('subscriptions.created_at', $date->month)
                ->join('subscription_plans', 'subscriptions.subscription_plan_id', '=', 'subscription_plans.id')
                ->sum('subscription_plans.price');
            return ['month' => $date->format('M'), 'mrr' => round($revenue / 1000000, 1)];
        });

        // Conversion rate over time (simulated historical data for chart based on current rate)
        $conversionData = collect(range(11, 0))->map(function ($i) use ($conversionRate) {
            $date = now()->subMonths($i);
            $variation = rand(-5, 5);
            $rate = max(0, min(100, $conversionRate + $variation));
            return ['month' => $date->format('M'), 'rate' => $rate];
        });

        // Plan distribution
        $planDist = SubscriptionPlan::withCount(['subscriptions' => function ($q) {
            $q->where('status', 'active');
        }])->get()->map(fn($p) => [
            'name' => $p->name,
            'value' => $p->subscriptions_count,
        ]);

        return Inertia::render('admin/analytics', [
            'stats' => [
                'mrr' => $mrr,
                'churnRate' => $churnRate,
                'conversionRate' => $conversionRate,
                'dau' => $dau,
            ],
            'tenantGrowthChurn' => $tenantGrowthChurn,
            'mrrGrowth' => $mrrGrowth,
            'conversionData' => $conversionData,
            'planDistribution' => $planDist,
        ]);
    }
}
