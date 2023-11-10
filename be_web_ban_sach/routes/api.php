<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ReviewController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('user/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'userInformation']);
    Route::resource('order', OrderController::class)->only(['store']);
});

Route::prefix('/auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

Route::resource('authors', AuthorController::class)->only(['index']);
Route::resource('categories', CategoryController::class)->only(['index']);
Route::resource('reviews', ReviewController::class)->only(['index', 'show', 'store']);
Route::resource('books', BookController::class)->only(['index', 'show']);
