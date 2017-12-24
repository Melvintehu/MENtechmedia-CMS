<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Folder extends Model
{
    

    /**
     * 
     */
    public static function searchFor(Request $request) 
    {   

        returnFolder::where(parseQuerystring($request->get('where')))->get();
    }
    
}
