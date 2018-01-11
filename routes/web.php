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

$web_namespace = "App\\Http\\Controllers\\";
$cms_namespace = "App\\Http\\Controllers\\cms\\";
$auth_namespace = "App\\http\\Controllers\Auth\\";

Route::get('/', function () {
    return view('cms.Core.setup.index');
});




/**
 * CMS ROUTES
 */

Route::get('/cropper', $cms_namespace . 'ImageHelperController@index');
Route::resource('photo', $cms_namespace . 'PhotosController');
Route::post('photo/multi', $cms_namespace . 'MultiPhotosController@store');


Route::group(['prefix' => 'cms'],  function () use ($cms_namespace, $web_namespace, $auth_namespace){
    
    Route::group(['middleware' => ['auth']], function() use ($cms_namespace, $web_namespace, $auth_namespace){
        
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

// Authentication Routes...
Route::get('login', $auth_namespace . 'LoginController@showLoginForm')->name('login');
Route::post('login', $auth_namespace . 'LoginController@login');
Route::post('logout', $auth_namespace . 'LoginController@logout')->name('logout');

// Registration Routes...
Route::get('register', $auth_namespace . 'RegisterController@showRegistrationForm')->name('register');
Route::post('register', $auth_namespace . 'RegisterController@register');

// Password Reset Routes...
Route::get('password/reset', $auth_namespace . 'ForgotPasswordController@showLinkRequestForm');
Route::post('password/email', $auth_namespace . 'ForgotPasswordController@sendResetLinkEmail');
Route::get('password/reset/{token}', $auth_namespace . 'ResetPasswordController@showResetForm');
Route::post('password/reset', $auth_namespace . 'ResetPasswordController@reset');

Route::get('home', $cms_namespace . 'HomeController@index');