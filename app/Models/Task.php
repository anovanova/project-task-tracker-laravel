<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Task extends Model
{
    use HasUuids;

    protected $fillable = [
        'project_id',
        'name',
        'description',
        'priority',
        'status',
        'schedule_from',
        'schedule_to',
    ];
    protected $primaryKey = 'uuid';
}
