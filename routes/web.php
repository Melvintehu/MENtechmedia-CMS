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
    return view('homepage');
});




/**
 * CMS ROUTES
 */

Route::get('/cropper', 'cms\ImageHelperController@index');
Route::resource('photo', 'cms\PhotosController');
Route::post('photo/multi', 'cms\MultiPhotosController@store');

Route::group(['prefix' => 'cms'],  function () {
    Route::group(['middleware' => ['auth']], function(){

        // --- CORE ROUTES ONLY
        Route::get('/profile/{id}/edit', 'cms\ProfileController@edit');
        Route::get('/logout', 'cms\LogoutController@logout');
   		Route::get('/', 'cms\DashBoardController@index');
        Route::get('/edit', 'cms\FrontController@edit');
        // ----------------- GENERIC ROUTES FOR EVERY PROJECT GO HERE ----------


        // ------ CUSTOM ROUTES GO UNDERNEATH HERE ----------------
        Route::resource('entity', 'cms\FrontController');

    });
});

Auth::routes();
Route::get('home', 'cms\HomeController@index');