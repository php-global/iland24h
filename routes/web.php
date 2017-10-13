<?php
use Illuminate\Http\Request;
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

Route::get('getEditProject/{id}', 'ProjectController@getEditProject');
Route::get('getID', 'ProjectController@getID');
Route::post('postEditProject/{id}','ProjectController@postEditProject');

Route::post('insert', 'ProjectController@store');

Route::get('/admin', function () {
    return view('categories.index');
});


Route::get('/test', function () {
    return view('test');
});
Route::post('/test', function (Request $request) {
    $path = $request->fileToUpload->store('test');
    dd($path);
});