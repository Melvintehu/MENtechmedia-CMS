<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('cms.Core.setup.index');
});




/**
 * CMS ROUTES
 */

Route::get('/cropper', 'cms\ImageHelperController@index');
Route::resource('photo', 'cms\PhotosController');
Route::post('photo/multi', 'cms\MultiPhotosController@store');

Route::group(['prefix' => 'cms'],  function () {

    Route::group(['middleware' => ['auth']], function(){

        /**
         * Routes for CMS front-end here
         */

        foreach (File::glob(base_path('routes/cms/core/*.php')) as $filename) {
            if (isset($filename) && file_exists($filename)) {
                require $filename;
            }
        }

    });
});

Auth::routes();
Route::get('home', 'cms\HomeController@index');