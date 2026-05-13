<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tenants', function (Blueprint $table) {
            $table->id();
            $table->string('business_name');
            $table->string('slug')->unique();
            $table->string('domain')->unique();
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('logo')->nullable();
            $table->enum('status', ['active', 'suspended', 'inactive', 'trial'])->default('trial');
            $table->enum('subscription_status', ['active', 'expired', 'cancelled', 'trial'])->default('trial');
            $table->timestamp('trial_ends_at')->nullable();
            $table->timestamp('last_active_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tenants');
    }
};
