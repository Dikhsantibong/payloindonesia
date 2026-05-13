<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TenantUser extends Model
{
    protected $fillable = [
        'tenant_id',
        'name',
        'email',
        'password',
        'role',
        'status',
    ];

    protected $hidden = ['password'];

    public function tenant(): BelongsTo
    {
        return $this->belongsTo(Tenant::class);
    }
}
