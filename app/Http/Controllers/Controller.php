<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
/**
 * @OA\Info(
 *     version="1.0.0",
 *     title="Bookstore API Documentation",
 *     description="Dokumentasi API untuk Bookstore dengan Rating & Books endpoint"
 * )
 * 
 * @OA\Server(
 *     url="http://localhost:8000",
 *     description="API Server"
 * )
 */
class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;
}
