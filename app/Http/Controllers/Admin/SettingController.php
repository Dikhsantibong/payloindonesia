<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ActivityLog;

class SettingController extends Controller
{
    public function index()
    {
        $settings = Setting::all()->pluck('value', 'key')->toArray();

        // Default values if not exist
        $defaults = [
            'app_name' => 'Paylo',
            'support_email' => 'support@paylo.id',
            'support_phone' => '+62 800 1234 5678',
            'maintenance_mode' => 'false',
            'registration_enabled' => 'true',
            'trial_days' => '14',
            'payment_gateway_api' => '',
            'payment_gateway_secret' => '',
        ];

        return Inertia::render('admin/settings', [
            'settings' => array_merge($defaults, $settings)
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->except(['_token']);

        foreach ($data as $key => $value) {
            Setting::updateOrCreate(
                ['key' => $key],
                ['value' => is_bool($value) ? ($value ? 'true' : 'false') : $value]
            );
        }

        ActivityLog::log(
            'updated',
            'Memperbarui konfigurasi system settings',
            null
        );

        return redirect()->back()->with('success', 'Pengaturan sistem berhasil disimpan.');
    }
}
