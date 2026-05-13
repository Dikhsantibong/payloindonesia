<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tenant extends Model
{
    protected $fillable = [
        'business_name',
        'slug',
        'domain',
        'email',
        'phone',
        'logo',
        'status',
        'subscription_status',
        'trial_ends_at',
        'last_active_at',
    ];

    protected $casts = [
        'trial_ends_at' => 'datetime',
        'last_active_at' => 'datetime',
    ];

    public function users(): HasMany
    {
        return $this->hasMany(TenantUser::class);
    }

    public function subscriptions(): HasMany
    {
        return $this->hasMany(Subscription::class);
    }

    public function activeSubscription()
    {
        return $this->hasOne(Subscription::class)->where('status', 'active')->latest();
    }

    public function tickets(): HasMany
    {
        return $this->hasMany(SupportTicket::class);
    }

    public function currentPlan()
    {
        return $this->activeSubscription?->plan;
    }

    public function isTrialExpired(): bool
    {
        return $this->status === 'trial' && $this->trial_ends_at && $this->trial_ends_at->isPast();
    }

    public function trialDaysRemaining(): int
    {
        if (!$this->trial_ends_at || $this->status !== 'trial') {
            return 0;
        }
        return max(0, (int) now()->diffInDays($this->trial_ends_at, false));
    }
}
