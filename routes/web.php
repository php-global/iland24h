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
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/admin', function () {
    return view('categories.index');
});
Route::resource('categories', 'CategoryController');
Route::resource('projects', 'ProjectController');
/*Route::get('insertProject','ProjectController@store');
Route::get('projects','ProjectController@index');*/
//Route::get('projects', 'UserController@showProfile')->name('profile');
//Route::get('/projects/','ProjectController@index');

Route::get('test', 'ProjectController@index');
Route::post('insert', 'ProjectController@store');