<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::updateOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'role' => 'super_admin',
                'password' => bcrypt('password'), // Ensure a password exists if creating
            ]
        );

        $this->call([
            AdminDashboardSeeder::class,
        ]);

        // Cleanup: Remove any old plans that are not in our 3 main plans
        \App\Models\SubscriptionPlan::whereNotIn('slug', ['starter', 'professional', 'enterprise'])->delete();
    }
}
