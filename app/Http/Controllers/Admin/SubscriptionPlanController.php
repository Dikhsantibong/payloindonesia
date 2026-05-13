<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SubscriptionPlan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class SubscriptionPlanController extends Controller
{
    public function index()
    {
        $packages = SubscriptionPlan::withCount('subscriptions')->get();
        return Inertia::render('admin/packages', [
            'packages' => $packages
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'max_users' => 'required|integer|min:1',
            'max_products' => 'required|integer|min:1',
            'duration_days' => 'required|integer|min:1',
            'features' => 'nullable|array',
            'is_active' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        SubscriptionPlan::create($validated);

        return redirect()->back()->with('success', 'Paket langganan berhasil ditambahkan.');
    }

    public function update(Request $request, SubscriptionPlan $package)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'max_users' => 'required|integer|min:1',
            'max_products' => 'required|integer|min:1',
            'duration_days' => 'required|integer|min:1',
            'features' => 'nullable|array',
            'is_active' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        $package->update($validated);

        return redirect()->back()->with('success', 'Paket langganan berhasil diperbarui.');
    }

    public function destroy(SubscriptionPlan $package)
    {
        if ($package->subscriptions()->exists()) {
            return redirect()->back()->with('error', 'Paket tidak dapat dihapus karena masih digunakan oleh tenant.');
        }

        $package->delete();

        return redirect()->back()->with('success', 'Paket langganan berhasil dihapus.');
    }
}
