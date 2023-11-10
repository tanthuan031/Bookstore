<?php

namespace App\Models;

use App\Http\Traits\Review\ScopeReview;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'review';
    protected $fillable = ['book_id', 'review_title', 'review_details', 'rating_star', 'review_date'];

    public function Book()
    {
        return $this->belongsTo(Book::class);
    }

    public function scopeFilterBase($query, $request)
    {
        return $query
            ->when($request->has('filter.rating_star'), function ($query) use ($request) {
                $rating_star = $request->query('filter')['rating_star'];

                $query
                    ->where('review.rating_star', $rating_star);
            });
    }

    public function scopeSortBase($query, $request)
    {
        $query
            ->when($request->has('sort'), function ($query) use ($request) {
                $sortBy = '';
                $sortValue = '';

                foreach ($request->get('sort') as $key => $value) {
                    $sortBy = $key;
                    $sortValue = $value;
                }

                $query
                    ->when($sortBy === 'review_date', function ($query) use ($sortValue) {
                        $query->orderBy('review.review_date', $sortValue);
                    });
            });

        return $query;
    }
}
