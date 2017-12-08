<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class NavGroup extends Model
{
    protected $fillable = [
        'name',
    ];

    /**
     * Get the Entities for the NavGroup.
     */
    public function entities()
    {
        return $this->hasMany('App\Entity');
    }
}
