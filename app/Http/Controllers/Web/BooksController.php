<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BooksController extends Controller
{
    public function indexPageBooks()
    {
        return Inertia::render('Books');
    }
}
