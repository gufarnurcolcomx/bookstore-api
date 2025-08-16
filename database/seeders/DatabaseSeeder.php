<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Author;
use App\Models\BookCategory;
use App\Models\Book;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        // -------------------------
        // 1. Seed Authors (1000)
        // -------------------------
        $authors = [];
        for ($i = 0; $i < 1000; $i++) {
            $authors[] = [
                'name' => $faker->name,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }
        DB::table('authors')->insert($authors);
        $this->command->info('1000 Authors seeded!');

        // -------------------------
        // 2. Seed Book Categories (300)
        // -------------------------
        $categories = [];
        for ($i = 0; $i < 300; $i++) {
            $categories[] = [
                'name' => ucfirst($faker->word),
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }
        DB::table('book_categories')->insert($categories);
        $this->command->info('300 Book Categories seeded!');

        $authorIds = Author::pluck('id')->toArray();
        $categoryIds = BookCategory::pluck('id')->toArray();

        // -------------------------
        // 3. Seed Books (50-150 per author)
        // -------------------------
        $books = [];
        foreach ($authorIds as $authorId) {
            $numBooks = rand(50, 150);
            for ($i = 0; $i < $numBooks; $i++) {
                $books[] = [
                    'title' => $faker->sentence(3),
                    'author_id' => $authorId,
                    'category_id' => $faker->randomElement($categoryIds),
                    'created_at' => now(),
                    'updated_at' => now(),
                ];

                if (count($books) >= 1000) {
                    DB::table('books')->insert($books);
                    $this->command->info(count($books) . ' Books seeded!');
                    $books = [];
                }
            }
        }
        if (!empty($books)) {
            DB::table('books')->insert($books);
            $this->command->info(count($books) . ' Books seeded (final batch)!');
        }

        // -------------------------
        // 4. Seed Ratings (1-10 per book)
        // -------------------------
        Book::chunk(1000, function ($booksChunk) use ($faker) {
            $ratings = [];
            foreach ($booksChunk as $book) {
                $numRatings = rand(1, 10);
                for ($i = 0; $i < $numRatings; $i++) {
                    $ratings[] = [
                        'book_id' => $book->id,
                        'score' => $faker->numberBetween(1, 10),
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];

                    if (count($ratings) >= 1000) {
                        DB::table('ratings')->insert($ratings);
                        $ratings = [];
                    }
                }
            }
            if (!empty($ratings)) {
                DB::table('ratings')->insert($ratings);
            }
        });

        $this->command->info('All Ratings seeded successfully!');
    }
}
