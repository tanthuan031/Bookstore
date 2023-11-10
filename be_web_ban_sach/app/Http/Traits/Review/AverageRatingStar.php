<?php

namespace App\Http\Traits\Review;

use App\Models\Book;
use Illuminate\Database\Eloquent\Builder;

trait AverageRatingStar
{
    public function getAverageRatingStar(): Builder
    {
        $bookQuery = Book::query();

        $statistic_review = $bookQuery
            ->leftJoin('review', 'book.id', '=', 'review.book_id')
            ->select('book.id')
            ->selectRaw('
                round(count(book_id), 2) as total_review,
                round(sum(rating_star), 2) as total_rating')
            ->orderBy('book.id')
            ->groupBy('book.id');

        return $bookQuery
            ->joinSub($statistic_review, 'statistic_review', function ($join) {
                $join->on('book.id', '=', 'statistic_review.id');
            })
            ->selectRaw('
                round(statistic_review.total_rating / statistic_review.total_review, 2) as average_rating_star
            ')
            ->orderByDesc('average_rating_star')
            ->groupBy('book.id',
                'statistic_review.total_review',
                'statistic_review.total_rating');
    }
}
