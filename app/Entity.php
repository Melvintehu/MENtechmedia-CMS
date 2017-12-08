<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Entity extends Model
{
    protected $fillable = [
        'name',
        'title',
        'description',
        'nav_group_id',
        'icon',
    ];

    /**
     * Get the NavGroup that owns the Entity.
     */
    public function navGroup()
    {
        return $this->belongsTo('App\NavGroup');
    }
}
