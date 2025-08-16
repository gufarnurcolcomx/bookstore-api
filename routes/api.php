<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthorController;
use App\Http\Controllers\Api\BooksController;
use App\Http\Controllers\Api\RatingController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/authors', [AuthorController::class, 'indexTopAuthors']);
Route::get('/books', [BooksController::class, 'indexBooks']);
Route::post('/ratings', [RatingController::class, 'storeRating']);
Route::get('/books-authors', [RatingController::class, 'indexBookAuthor']);