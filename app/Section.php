<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    use HasPhotos;

    protected $appends = [
        'original',
    ];

    protected $fillable = [
        'title',
        'body',
        'user_id',
    ];
}
