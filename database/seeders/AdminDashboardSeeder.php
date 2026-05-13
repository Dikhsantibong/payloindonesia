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
                'price' => 49000,
                'max_users' => 5,
                'max_products' => 100,
                'features' => json_encode(['Basic POS', 'Basic Reporting']),
                'duration_days' => 30,
            ],
            [
                'name' => 'Pro',
                'slug' => 'pro',
                'price' => 99000,
                'max_users' => 15,
                'max_products' => 500,
                'features' => json_encode(['Advanced POS', 'Inventory Management', 'Advanced Reporting']),
                'duration_days' => 30,
            ],
            [
                'name' => 'Enterprise',
                'slug' => 'enterprise',
                'price' => 199000,
                'max_users' => 50,
                'max_products' => 2000,
                'features' => json_encode(['Custom POS', 'Multi-Outlet', 'Priority Support']),
                'duration_days' => 30,
            ]
        ];

        foreach ($plans as $planData) {
            SubscriptionPlan::create($planData);
        }

        $allPlans = SubscriptionPlan::all();

        // 2. Create Tenants
        $tenantsData = [
            ['name' => 'Warung Makan Barokah', 'owner' => 'Ahmad Fauzi', 'email' => 'ahmad@barokah.id', 'plan' => 'pro', 'status' => 'active'],
            ['name' => 'Toko Elektronik Jaya', 'owner' => 'Budi Santoso', 'email' => 'budi@jayaelektro.id', 'plan' => 'enterprise', 'status' => 'active'],
            ['name' => 'Salon Cantik Indah', 'owner' => 'Siti Nurhaliza', 'email' => 'siti@cantikindah.id', 'plan' => 'starter', 'status' => 'trial'],
            ['name' => 'Apotek Sehat Selalu', 'owner' => 'Dr. Ratna', 'email' => 'ratna@sehatselalu.id', 'plan' => 'pro', 'status' => 'active'],
            ['name' => 'Kedai Kopi Nusantara', 'owner' => 'Reza Pratama', 'email' => 'reza@kopinus.id', 'plan' => 'starter', 'status' => 'suspended'],
            ['name' => 'Bengkel Motor Cepat', 'owner' => 'Joko Widodo', 'email' => 'joko@motorcepat.id', 'plan' => 'pro', 'status' => 'trial'],
            ['name' => 'Bakery Sweet House', 'owner' => 'Linda Agustina', 'email' => 'linda@sweethouse.id', 'plan' => 'enterprise', 'status' => 'active'],
            ['name' => 'Pet Shop Happy Tails', 'owner' => 'Dewi Sartika', 'email' => 'dewi@happytails.id', 'plan' => 'starter', 'status' => 'trial'],
        ];

        foreach ($tenantsData as $index => $tData) {
            $slug = Str::slug($tData['name']);
            $domain = $slug . '.paylo.id';
            
            $createdAt = now()->subDays(rand(1, 30));
            $trialEnds = $tData['status'] === 'trial' ? now()->addDays(rand(1, 14)) : now()->subDays(rand(1, 30));

            $tenant = Tenant::create([
                'business_name' => $tData['name'],
                'slug' => $slug,
                'domain' => $domain,
                'email' => $tData['email'],
                'phone' => '0812' . rand(10000000, 99999999),
                'status' => $tData['status'],
                'subscription_status' => $tData['status'] === 'active' ? 'active' : ($tData['status'] === 'trial' ? 'trial' : 'expired'),
                'trial_ends_at' => $trialEnds,
                'last_active_at' => now()->subHours(rand(1, 48)),
                'created_at' => $createdAt,
                'updated_at' => $createdAt,
            ]);

            // Create owner
            TenantUser::create([
                'tenant_id' => $tenant->id,
                'name' => $tData['owner'],
                'email' => $tData['email'],
                'password' => bcrypt('password'),
                'role' => 'owner',
                'status' => 'active',
                'created_at' => $createdAt,
            ]);

            // Create random additional users
            $userCount = rand(2, 20);
            for ($i = 0; $i < $userCount; $i++) {
                TenantUser::create([
                    'tenant_id' => $tenant->id,
                    'name' => 'Staff ' . ($i + 1),
                    'email' => 'staff' . ($i + 1) . '@' . $domain,
                    'password' => bcrypt('password'),
                    'role' => 'staff',
                    'status' => 'active',
                    'created_at' => $createdAt->copy()->addHours(rand(1, 24)),
                ]);
            }

            // Create Subscription
            $plan = $allPlans->where('slug', $tData['plan'])->first();
            if ($plan) {
                Subscription::create([
                    'tenant_id' => $tenant->id,
                    'subscription_plan_id' => $plan->id,
                    'start_date' => $createdAt,
                    'end_date' => $createdAt->copy()->addDays($plan->duration_days),
                    'status' => $tData['status'] === 'suspended' ? 'cancelled' : ($tData['status'] === 'trial' ? 'trial' : 'active'),
                    'payment_status' => 'paid',
                    'created_at' => $createdAt,
                ]);
            }

            // Create Support Tickets
            if (rand(0, 1)) {
                $priorities = ['low', 'medium', 'high', 'critical'];
                $statuses = ['open', 'in_progress', 'resolved', 'closed'];
                SupportTicket::create([
                    'tenant_id' => $tenant->id,
                    'subject' => 'Issue with ' . $tData['name'],
                    'message' => 'Detail of the issue...',
                    'priority' => $priorities[array_rand($priorities)],
                    'status' => $statuses[array_rand($statuses)],
                    'created_at' => now()->subHours(rand(1, 72)),
                    'updated_at' => now()->subMinutes(rand(10, 300)),
                ]);
            }
        }

        // Add some more random historical data for growth charts
        for ($i = 0; $i < 50; $i++) {
            $createdAt = now()->subMonths(rand(1, 11))->subDays(rand(1, 28));
            $plan = $allPlans->random();
            
            $tenant = Tenant::create([
                'business_name' => 'History Tenant ' . $i,
                'slug' => 'history-tenant-' . $i,
                'domain' => 'history-tenant-' . $i . '.paylo.id',
                'email' => 'history' . $i . '@paylo.id',
                'status' => 'active',
                'subscription_status' => 'active',
                'created_at' => $createdAt,
                'updated_at' => $createdAt,
            ]);

            Subscription::create([
                'tenant_id' => $tenant->id,
                'subscription_plan_id' => $plan->id,
                'start_date' => $createdAt,
                'end_date' => $createdAt->copy()->addDays($plan->duration_days),
                'status' => 'active',
                'payment_status' => 'paid',
                'created_at' => $createdAt,
            ]);
            
            TenantUser::create([
                'tenant_id' => $tenant->id,
                'name' => 'Owner ' . $i,
                'email' => 'owner' . $i . '@history.com',
                'password' => bcrypt('password'),
                'role' => 'owner',
                'created_at' => $createdAt,
            ]);
        }
    }
}
