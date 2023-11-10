<?php

namespace App\Models;

use App\Http\Traits\CheckDiscount;
use App\Http\Traits\Review\AverageRatingStar;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;
    use CheckDiscount;
    use AverageRatingStar;

    public $timestamps = false;
    protected $table = 'book';

    public function Category()
    {
        return $this->belongsTo(Category::class);
    }

    public function Author()
    {
        return $this->belongsTo(Author::class);
    }

    public function Discount()
    {
        return $this->hasOne(Discount::class);
    }

    public function Review()
    {
        return $this->hasMany(Review::class);
    }

    public function scopeJoinWithBooks($query)
    {
        $checkDiscount = $this->checkDiscount();

        return $query->join('author', 'book.author_id', '=', 'author.id')
            ->join('category', 'book.category_id', '=', 'category.id')
            ->select('book.id',
                'book.book_title',
                'author.author_name',
                'category.category_name',
                'book.book_price',
                'book.book_cover_photo',
                'book.book_summary',
                'check_discount.discount_price',
                'check_discount.final_price')
            ->joinSub($checkDiscount, 'check_discount', function ($join) {
                $join->on('book.id', '=', 'check_discount.id');
            });
    }

    public function scopeOnSaleBooks($query, $onSaleSortDirection)
    {
        return $query
            ->JoinWithBooks()
            ->where('check_discount.discount_price', '!=', null)
            ->whereRaw('check_discount.discount_price = check_discount.final_price')
            ->selectRaw('book.book_price - check_discount.discount_price AS sub_price')
            ->orderBy('sub_price', $onSaleSortDirection)
            ->orderBy('check_discount.final_price', 'asc');
    }

    public function scopeOnRecommendedBooks($query, $onRecommendedSortDirection)
    {
        return $query
            ->JoinWithBooks()
            ->join('review', 'book.id', '=', 'review.book_id')
            ->withAvg('review', 'rating_star')
            ->groupBy('book.id',
                'book.book_title',
                'author.author_name',
                'category.category_name',
                'book.book_price',
                'book.book_cover_photo',
                'book.book_summary',
                'check_discount.discount_price',
                'check_discount.final_price',
                'review_avg_rating_star')
            ->orderBy('review_avg_rating_star', $onRecommendedSortDirection)
            ->orderBy('check_discount.final_price', 'asc');
    }

    public function scopeOnPopularBooks($query, $onPopularSortDirection)
    {
        return $query
            ->JoinWithBooks()
            ->join('review', 'book.id', '=', 'review.book_id')
            ->withCount('review')
            ->groupBy('book.id',
                'book.book_title',
                'author.author_name',
                'category.category_name',
                'book.book_price',
                'book.book_cover_photo',
                'book.book_summary',
                'check_discount.discount_price',
                'check_discount.final_price',
                'review_count')
            ->orderBy('review_count', $onPopularSortDirection)
            ->orderBy('check_discount.final_price', 'asc');
    }

    public function scopeSortBase($query, $request)
    {
        return $query
            ->when($request->has('sort'), function ($query) use ($request) {
                $sortBy = '';
                $sortValue = '';

                foreach ($request->get('sort') as $key => $value) {
                    $sortBy = $key;
                    $sortValue = $value;
                }

                $query
                    ->when($sortBy === 'on_sale', function ($query) use ($sortValue) {
                        $query
                            ->onSaleBooks($sortValue);

                    })
                    ->when($sortBy === 'on_popularity', function ($query) use ($sortValue) {
                        $query
                            ->OnPopularBooks($sortValue);
                    })
                    ->when($sortBy === 'on_recommended', function ($query) use ($sortValue) {
                        $query
                            ->OnRecommendedBooks($sortValue);
                    })
                    ->when($sortBy === 'price', function ($query) use ($sortValue) {
                        $query
                            ->JoinWithBooks()
                            ->orderBy('check_discount.final_price', $sortValue);
                    });
            });
    }

    public function scopeFilterBase($query, $request)
    {
        return $query
            ->when($request->has('filter.category'), function ($query) use ($request) {
                $list = explode(',', $request->query('filter')['category']);
                $query->whereIn('category_name', $list);
            })
            ->when($request->has('filter.author'), function ($query) use ($request) {
                $list = explode(',', $request->query('filter')['author']);
                $query->whereIn('author_name', $list);
            })
            ->when($request->has('filter.rating_star'), function ($query) use ($request) {
                $rating_star = $request->query('filter')['rating_star'];

                $query
                    ->joinSub($this->getAverageRatingStar(), 'book_avg_rating', function ($join) {
                        $join->on('book.id', '=', 'book_avg_rating.id');
                    })
                    ->where('book_avg_rating.average_rating_star', '>=', $rating_star);
            });
    }
}
