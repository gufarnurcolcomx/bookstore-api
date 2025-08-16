<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Book;

/**
 * @group Books
 * APIs for books
 */
class BooksController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/books",
     *     tags={"Books"},
     *     summary="Get list of books",
     *     description="Returns a paginated list of books with author, category, ratings count and average score.",
     *     @OA\Parameter(
     *         name="search",
     *         in="query",
     *         description="Filter books by title or author name",
     *         required=false,
     *         @OA\Schema(type="string", example="Harry")
     *     ),
     *     @OA\Parameter(
     *         name="voter_count",
     *         in="query",
     *         description="Minimum number of ratings",
     *         required=false,
     *         @OA\Schema(type="integer", example=5)
     *     ),
     *     @OA\Parameter(
     *         name="per_page",
     *         in="query",
     *         description="Number of results per page (max 100)",
     *         required=false,
     *         @OA\Schema(type="integer", example=10)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="data", type="array", @OA\Items(
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="title", type="string", example="Book Title"),
     *                 @OA\Property(property="author", type="object",
     *                     @OA\Property(property="id", type="integer", example=1),
     *                     @OA\Property(property="name", type="string", example="Author Name")
     *                 ),
     *                 @OA\Property(property="category", type="object",
     *                     @OA\Property(property="id", type="integer", example=1),
     *                     @OA\Property(property="name", type="string", example="Category Name")
     *                 ),
     *                 @OA\Property(property="voter_count", type="integer", example=10),
     *                 @OA\Property(property="average_rating", type="number", format="float", example=8.5)
     *             )),
     *             @OA\Property(property="links", type="object"),
     *             @OA\Property(property="meta", type="object")
     *         )
     *     )
     * )
     */
    public function indexBooks(Request $request)
    {
        $query = Book::with(['author', 'category'])
            ->withCount(['ratings as voter_count'])
            ->withAvg('ratings as average_rating', 'score');

        $this->applySearchFilter($query, $request);
        $this->applyVoterFilter($query, $request);

        $perPage = $request->get('per_page', 10);
        $books = $query->orderByDesc('average_rating')->paginate($perPage);

        return response()->json($books);
    }

    // Private
    private function applySearchFilter($query, Request $request)
    {
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('title', 'like', "%$search%")
                  ->orWhereHas('author', fn($q) => $q->where('name', 'like', "%$search%"));
        }
    }

    private function applyVoterFilter($query, Request $request)
    {
        if ($request->filled('voter_count')) {
            $query->having('voter_count', '>=', $request->voter_count);
        }
    }
}
