<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use Inertia\Inertia;

class ActivityLogController extends Controller
{
    public function index()
    {
        $logs = ActivityLog::with('admin')
            ->latest('created_at')
            ->paginate(20)
            ->through(fn(ActivityLog $log) => [
                'id' => $log->id,
                'action' => $log->action,
                'description' => $log->description,
                'admin' => $log->admin?->name ?? 'System',
                'date' => $log->created_at->format('d M Y H:i'),
                'relative' => $log->created_at->diffForHumans(),
            ]);

        return Inertia::render('admin/logs', [
            'logs' => $logs,
        ]);
    }
}
