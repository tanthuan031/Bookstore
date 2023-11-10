<?php

namespace App\Repositories\Review;

use App\Http\Requests\ReviewRequest;
use App\Http\Traits\ApiResponse;
use App\Http\Traits\Review\StatisticReview;
use App\Models\Review;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;

class ReviewRepository implements ReviewInterface
{
    use ApiResponse;
    use StatisticReview;

    private Builder $query;

    public function __construct()
    {
        $this->query = Review::query();
    }

    public function getRecords(Request $request): JsonResponse
    {
        $conditions = $request->get('mode');

        $data = null;

        if ($conditions) {
            foreach ($conditions as $key => $value) {
                if ($key === 'rating_star' && $value === 'on') {
                    $data = $this->query
                    ->select($key)
                    ->orderBy($key)
                    ->groupBy('rating_star')
                    ->get();
                }
            }
        }

        if (!$conditions) {
            $data = $this->query->get();
        }

        return $this->apiResponse($data, 'success', 'Get Data Successfully');
    }

    public function getReviewsByBookId($id, Request $request): JsonResponse
    {
        $per_page = $request->query('per_page')
            ? $request->query('per_page') : config('app.per_page');

        $data = Review::query()
            ->FilterBase($request)
            ->SortBase($request)
            ->where('book_id', $id)
            ->paginate($per_page);

        $totalReviewRatingById = $this->getTotalReviewRatingById($id)->get()->first();
        $countRatingStar = $this->countRatingStar($id)->get();

        $addDataPaginate = collect([
            'general_total' => $totalReviewRatingById,
            'count_rating_star' => $countRatingStar,
        ]);

        $final = $addDataPaginate->merge($data);

        return $this->apiResponse($final, 'success', 'Get Data Successfully');
    }

    public function createNewReview(ReviewRequest $request): JsonResponse
    {
        $body = [
            'book_id' => $request->book_id,
            'review_title' => $request->review_title,
            'review_details' => $request->review_details,
            'rating_star' => $request->rating_star,
            'review_date' => Carbon::now('Asia/Ho_Chi_Minh')->toDateTimeString(),
        ];

        $newProduct = Review::create($body);

        return $this->apiResponse($newProduct, 'success', 'Create Review Successfully');
    }
}
