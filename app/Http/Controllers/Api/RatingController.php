<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Rating;
use App\Models\Book;
use App\Http\Requests\RatingRequest;

/**
 * @group Ratings
 * APIs for ratings
 */
class RatingController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/books-authors",
     *     tags={"Ratings"},
     *     summary="List books with their authors (pagination & search)",
     *     description="Retrieve paginated list of books with their authors, with optional search and perPage.",
     *     @OA\Parameter(
     *         name="search",
     *         in="query",
     *         description="Search by book title or author name",
     *         required=false,
     *         @OA\Schema(type="string"),
     *         example="Harry Potter"
     *     ),
     *     @OA\Parameter(
     *         name="perPage",
     *         in="query",
     *         description="Number of results per page",
     *         required=false,
     *         @OA\Schema(type="integer"),
     *         example=20
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="current_page", type="integer", example=1),
     *             @OA\Property(property="data", type="array",
     *                 @OA\Items(
     *                     @OA\Property(property="id", type="integer", example=1),
     *                     @OA\Property(property="title", type="string", example="Book Title"),
     *                     @OA\Property(property="author", type="object",
     *                         @OA\Property(property="id", type="integer", example=1),
     *                         @OA\Property(property="name", type="string", example="Author Name")
     *                     )
     *                 )
     *             ),
     *             @OA\Property(property="total", type="integer", example=100)
     *         )
     *     )
     * )
     */
    public function indexBookAuthor(Request $request)
    {
        $books = $this->getBookList($request);
        return response()->json($books);
    }

    /**
     * @OA\Post(
     *     path="/api/ratings",
     *     tags={"Ratings"},
     *     summary="Submit a rating for a book",
     *     description="Add a rating to a book",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"book_id","score"},
     *             @OA\Property(property="book_id", type="integer", example=1),
     *             @OA\Property(property="score", type="integer", example=8, description="Rating score between 1-10")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Rating submitted successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Rating submitted successfully"),
     *             @OA\Property(property="rating", type="object",
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="book_id", type="integer", example=1),
     *                 @OA\Property(property="score", type="integer", example=8)
     *             )
     *         )
     *     )
     * )
     */
    public function storeRating(RatingRequest $request)
    {
        $rating = Rating::create($request->validated());

        return response()->json([
            'message' => 'Rating submitted successfully',
            'rating' => $rating
        ]);
    }

    // Private
    private function getBookList(Request $request)
    {
        $perPage = $request->input('perPage', 10);
        $search  = $request->input('search');

        $query = Book::with('author');

        if ($search) {
            $query->where('title', 'like', "%{$search}%")
                ->orWhereHas('author', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%");
                });
        }

        return $query->paginate($perPage);
    }
}
