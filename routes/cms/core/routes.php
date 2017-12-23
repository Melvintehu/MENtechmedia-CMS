<?php

// --- CORE ROUTES ONLY
Route::get('/profile/edit', 'cms\ProfileController@edit');
Route::get('/logout', 'cms\LogoutController@logout');
Route::get('/', 'cms\DashBoardController@index');
Route::get('/edit', 'cms\FrontController@edit');

// --- CORE POSt ROUTES ONLY
Route::post('/step1', 'cms\SetupController@step1');


// ----------------- GENERIC ROUTES FOR EVERY PROJECT GO HERE ----------


// ------ CUSTOM ROUTES GO UNDERNEATH HERE ----------------
Route::resource('entity', 'cms\FrontController');

?>