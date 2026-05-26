<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tenant;
use App\Models\SubscriptionPlan;
use App\Models\Subscription;
use App\Models\TenantUser;
use App\Models\SupportTicket;
use App\Models\ActivityLog;
use Illuminate\Support\Str;

class AdminDashboardSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create Subscription Plans
        $plans = [
            [
                'name' => 'Starter',
                'slug' => 'starter',
                'price' => 199000,
                'max_users' => 2,
                'max_products' => 100,
                'features' => [
                    'Kasir Online (POS)',
                    'Laporan Penjualan Dasar',
                    'Manajemen Stok Standar',
                    'Support via Email',
                ],
                'duration_days' => 30,
                'is_active' => true,
            ],
            [
                'name' => 'Professional',
                'slug' => 'professional',
                'price' => 499000,
                'max_users' => 10,
                'max_products' => 1000,
                'features' => [
                    'Semua fitur Starter',
                    'Manajemen Multi-cabang',
                    'Analisa Bisnis Lanjutan',
                    'Manajemen Karyawan & Shift',
                    'Support Prioritas 24/7',
                ],
                'duration_days' => 30,
                'is_active' => true,
            ],
            [
                'name' => 'Enterprise',
                'slug' => 'enterprise',
                'price' => 999000,
                'max_users' => 50,
                'max_products' => 10000,
                'features' => [
                    'Semua fitur Professional',
                    'API Integration',
                    'Custom Report Builder',
                    'Dedicated Account Manager',
                    'Training On-site',
                ],
                'duration_days' => 30,
                'is_active' => true,
            ]
        ];

        foreach ($plans as $planData) {
            SubscriptionPlan::updateOrCreate(['slug' => $planData['slug']], $planData);
        }

        $allPlans = SubscriptionPlan::all();

        // 2. Create Tenants
        $tenantsData = [
            ['name' => 'Warung Makan Barokah', 'owner' => 'Ahmad Fauzi', 'email' => 'ahmad@barokah.id', 'plan' => 'professional', 'status' => 'active'],
            ['name' => 'Toko Elektronik Jaya', 'owner' => 'Budi Santoso', 'email' => 'budi@jayaelektro.id', 'plan' => 'enterprise', 'status' => 'active'],
            ['name' => 'Salon Cantik Indah', 'owner' => 'Siti Nurhaliza', 'email' => 'siti@cantikindah.id', 'plan' => 'starter', 'status' => 'trial'],
            ['name' => 'Apotek Sehat Selalu', 'owner' => 'Dr. Ratna', 'email' => 'ratna@sehatselalu.id', 'plan' => 'professional', 'status' => 'active'],
            ['name' => 'Kedai Kopi Nusantara', 'owner' => 'Reza Pratama', 'email' => 'reza@kopinus.id', 'plan' => 'starter', 'status' => 'suspended'],
            ['name' => 'Bengkel Motor Cepat', 'owner' => 'Joko Widodo', 'email' => 'joko@motorcepat.id', 'plan' => 'professional', 'status' => 'trial'],
            ['name' => 'Bakery Sweet House', 'owner' => 'Linda Agustina', 'email' => 'linda@sweethouse.id', 'plan' => 'enterprise', 'status' => 'active'],
            ['name' => 'Pet Shop Happy Tails', 'owner' => 'Dewi Sartika', 'email' => 'dewi@happytails.id', 'plan' => 'starter', 'status' => 'trial'],
        ];

        foreach ($tenantsData as $index => $tData) {
            $slug = Str::slug($tData['name']);
            $domain = $slug . '.paylo.id';
            
            $createdAt = now()->subDays(rand(1, 30));
            $trialEnds = $tData['status'] === 'trial' ? now()->addDays(rand(1, 14)) : now()->subDays(rand(1, 30));

            $tenant = Tenant::updateOrCreate(
                ['slug' => $slug],
                [
                    'business_name' => $tData['name'],
                    'domain' => $domain,
                    'email' => $tData['email'],
                    'phone' => '0812' . rand(10000000, 99999999),
                    'status' => $tData['status'],
                    'subscription_status' => $tData['status'] === 'active' ? 'active' : ($tData['status'] === 'trial' ? 'trial' : 'expired'),
                    'trial_ends_at' => $trialEnds,
                    'last_active_at' => now()->subHours(rand(1, 48)),
                    'created_at' => $createdAt,
                    'updated_at' => $createdAt,
                ]
            );

            // Create owner
            TenantUser::updateOrCreate(
                ['tenant_id' => $tenant->id, 'role' => 'owner'],
                [
                    'name' => $tData['owner'],
                    'email' => $tData['email'],
                    'password' => bcrypt('password'),
                    'status' => 'active',
                    'created_at' => $createdAt,
                ]
            );

            // Create Subscription
            $plan = $allPlans->where('slug', $tData['plan'])->first();
            if ($plan) {
                Subscription::updateOrCreate(
                    ['tenant_id' => $tenant->id],
                    [
                        'subscription_plan_id' => $plan->id,
                        'start_date' => $createdAt,
                        'end_date' => $createdAt->copy()->addDays($plan->duration_days),
                        'status' => $tData['status'] === 'suspended' ? 'cancelled' : ($tData['status'] === 'trial' ? 'trial' : 'active'),
                        'payment_status' => 'paid',
                        'created_at' => $createdAt,
                    ]
                );
            }
        }

        // Add some more random historical data for growth charts
        for ($i = 0; $i < 50; $i++) {
            $slug = 'history-tenant-' . $i;
            $createdAt = now()->subMonths(rand(1, 11))->subDays(rand(1, 28));
            $plan = $allPlans->random();
            
            $tenant = Tenant::updateOrCreate(
                ['slug' => $slug],
                [
                    'business_name' => 'History Tenant ' . $i,
                    'domain' => $slug . '.paylo.id',
                    'email' => 'history' . $i . '@paylo.id',
                    'status' => 'active',
                    'subscription_status' => 'active',
                    'created_at' => $createdAt,
                    'updated_at' => $createdAt,
                ]
            );

            Subscription::updateOrCreate(
                ['tenant_id' => $tenant->id],
                [
                    'subscription_plan_id' => $plan->id,
                    'start_date' => $createdAt,
                    'end_date' => $createdAt->copy()->addDays($plan->duration_days),
                    'status' => 'active',
                    'payment_status' => 'paid',
                    'created_at' => $createdAt,
                ]
            );
            
            TenantUser::updateOrCreate(
                ['tenant_id' => $tenant->id, 'role' => 'owner'],
                [
                    'name' => 'Owner ' . $i,
                    'email' => 'owner' . $i . '@history.com',
                    'password' => bcrypt('password'),
                    'created_at' => $createdAt,
                ]
            );
        }
    }
}
