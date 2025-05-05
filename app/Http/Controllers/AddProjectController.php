<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Log;
use App\Models\Project;
use Illuminate\Support\Facades\Auth;

class AddProjectController extends Controller
{
    public function show(): Response
    {
        return Inertia::render('add-project');
    }

    public function store(Request $request): Response
    {
        Project::create([
            'user_id' => Auth::id(),
            'name' => $request->projectTitle,
            'description' => $request->projectDescription,
            'status' => 'Ongoing',
        ]);

        return Inertia::render('add-project');
    }
}
