<?php

namespace App\Http\Controllers\cms;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\User;
use Auth;

class ProfileController extends Controller
{
    public function edit($id)
    {
        $type = 'User';
        $object = Auth::user();

        return view('cms.Core.edit', compact('id', 'type', 'object'));
    }
}
