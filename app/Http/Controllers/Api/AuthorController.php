<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Author;

/**
 * @group Authors
 * APIs for authors
 */
class AuthorController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/authors",
     *     tags={"Authors"},
     *     summary="Get Top Authors",
     *     description="Returns the top 10 authors based on ratings greater than 5.",
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 type="object",
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="name", type="string", example="Author Name"),
     *                 @OA\Property(property="top_rating_voter_count", type="integer", example=12)
     *             )
     *         )
     *     )
     * )
     */
    public function indexTopAuthors()
    {
        $authors = Author::withCount(['ratings as top_rating_voter_count' => function ($query) {
            $query->where('score', '>', 5);
        }])
        ->orderByDesc('top_rating_voter_count')
        ->take(10)
        ->get();

        return response()->json($authors);
    }
}
