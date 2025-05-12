<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\AddProjectController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use Inertia\Inertia;

Route::get('/', [AuthenticatedSessionController::class, 'create'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('add-project', [AddProjectController::class, 'show'])
    ->name('password.confirm');

    Route::post('add-project', [AddProjectController::class, 'store'])->name('add-project');

    Route::get('get-projects', [ProjectController::class, 'index'])
    ->name('projects');

    Route::get('project/{id}', [ProjectController::class, 'show'])
    ->name('project');

    Route::get('project/{id}/add-task', [TaskController::class, 'index'])->name('add-task-request');

    Route::post('project/{id}/add-project-task', [TaskController::class, 'store'])->name('add-project-task');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
