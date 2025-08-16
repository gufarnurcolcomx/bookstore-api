<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RatingController extends Controller
{
    public function indexPageRating()
    {
        return Inertia::render('Rating');
    }
}
