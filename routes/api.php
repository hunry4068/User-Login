<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('test', "App\Http\Controllers\UserController@test");
Route::post('register', 'App\Http\Controllers\UserController@registerUser');
Route::post('login', 'App\Http\Controllers\UserController@loginUser');
Route::get('user/{email}', 'App\Http\Controllers\UserController@readUserInfo');
