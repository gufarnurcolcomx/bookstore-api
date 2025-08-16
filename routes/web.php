<?php
use App\Http\Controllers\Web\BooksController;
use App\Http\Controllers\Web\RatingController;
use App\Http\Controllers\Web\AuthorController;

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
    return redirect('/page-authors');
});

Route::get('/page-authors', [AuthorController::class, 'indexPageAuthor']);
Route::get('/page-books', [BooksController::class, 'indexPageBooks']);
Route::get('/page-ratings', [RatingController::class, 'indexPageRating']);