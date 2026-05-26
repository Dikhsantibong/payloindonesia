<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::get('pricing', function () {
    $plans = \App\Models\SubscriptionPlan::where('is_active', true)->get();
    return Inertia\Inertia::render('pricing', [
        'plans' => $plans
    ]);
})->name('pricing');
Route::inertia('demo', 'demo')->name('demo');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');

    // Super Admin Routes
    Route::middleware(['role:super_admin'])->group(function () {
        Route::get('admin/tenants', [\App\Http\Controllers\Admin\TenantController::class, 'index'])->name('admin.tenants');
        Route::post('admin/tenants', [\App\Http\Controllers\Admin\TenantController::class, 'store'])->name('admin.tenants.store');
        Route::put('admin/tenants/{tenant}', [\App\Http\Controllers\Admin\TenantController::class, 'update'])->name('admin.tenants.update');
        Route::post('admin/tenants/{tenant}/suspend', [\App\Http\Controllers\Admin\TenantController::class, 'suspend'])->name('admin.tenants.suspend');
        Route::post('admin/tenants/{tenant}/activate', [\App\Http\Controllers\Admin\TenantController::class, 'activate'])->name('admin.tenants.activate');
        Route::delete('admin/tenants/{tenant}', [\App\Http\Controllers\Admin\TenantController::class, 'destroy'])->name('admin.tenants.destroy');
        Route::get('admin/tenants/{tenant}', [\App\Http\Controllers\Admin\TenantController::class, 'show'])->name('admin.tenants.show');

        Route::get('admin/subscriptions', [\App\Http\Controllers\Admin\SubscriptionController::class, 'index'])->name('admin.subscriptions');
        Route::put('admin/subscriptions/{subscription}', [\App\Http\Controllers\Admin\SubscriptionController::class, 'updateStatus'])->name('admin.subscriptions.update');
        Route::get('admin/packages', [\App\Http\Controllers\Admin\SubscriptionPlanController::class, 'index'])->name('admin.packages');
        Route::post('admin/packages', [\App\Http\Controllers\Admin\SubscriptionPlanController::class, 'store'])->name('admin.packages.store');
        Route::put('admin/packages/{package}', [\App\Http\Controllers\Admin\SubscriptionPlanController::class, 'update'])->name('admin.packages.update');
        Route::delete('admin/packages/{package}', [\App\Http\Controllers\Admin\SubscriptionPlanController::class, 'destroy'])->name('admin.packages.destroy');
        
        Route::get('admin/analytics', [\App\Http\Controllers\Admin\AnalyticsController::class, 'index'])->name('admin.analytics');
        Route::get('admin/users', [\App\Http\Controllers\Admin\AdminUserController::class, 'index'])->name('admin.users');
        Route::post('admin/users', [\App\Http\Controllers\Admin\AdminUserController::class, 'store'])->name('admin.users.store');
        Route::put('admin/users/{user}', [\App\Http\Controllers\Admin\AdminUserController::class, 'update'])->name('admin.users.update');
        Route::delete('admin/users/{user}', [\App\Http\Controllers\Admin\AdminUserController::class, 'destroy'])->name('admin.users.destroy');
        
        Route::get('admin/support', [\App\Http\Controllers\Admin\SupportTicketController::class, 'index'])->name('admin.support');
        Route::get('admin/support/{ticket}', [\App\Http\Controllers\Admin\SupportTicketController::class, 'show'])->name('admin.support.show');
        Route::put('admin/support/{ticket}/status', [\App\Http\Controllers\Admin\SupportTicketController::class, 'updateStatus'])->name('admin.support.status');
        Route::post('admin/support/{ticket}/reply', [\App\Http\Controllers\Admin\SupportTicketController::class, 'storeReply'])->name('admin.support.reply');
        
        Route::get('admin/logs', [\App\Http\Controllers\Admin\ActivityLogController::class, 'index'])->name('admin.logs');

        Route::get('admin/invoices', [\App\Http\Controllers\Admin\InvoiceController::class, 'index'])->name('admin.invoices');
        Route::get('admin/invoices/create', [\App\Http\Controllers\Admin\InvoiceController::class, 'create'])->name('admin.invoices.create');
        Route::post('admin/invoices', [\App\Http\Controllers\Admin\InvoiceController::class, 'store'])->name('admin.invoices.store');
        Route::put('admin/invoices/{invoice}/status', [\App\Http\Controllers\Admin\InvoiceController::class, 'updateStatus'])->name('admin.invoices.status');
        Route::delete('admin/invoices/{invoice}', [\App\Http\Controllers\Admin\InvoiceController::class, 'destroy'])->name('admin.invoices.destroy');
        Route::get('admin/invoices/{invoice}/pdf', [\App\Http\Controllers\Admin\InvoiceController::class, 'downloadPdf'])->name('admin.invoices.pdf');

        Route::get('admin/settings', [\App\Http\Controllers\Admin\SettingController::class, 'index'])->name('admin.settings');
        Route::post('admin/settings', [\App\Http\Controllers\Admin\SettingController::class, 'store'])->name('admin.settings.store');
    });
});

require __DIR__.'/settings.php';
