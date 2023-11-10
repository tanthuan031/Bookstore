<?php

namespace App\Repositories\Review;

use App\Http\Requests\ReviewRequest;
use Illuminate\Http\Request;

interface ReviewInterface
{
    public function getRecords(Request $request);

    public function getReviewsByBookId($id, Request $request);

    public function createNewReview(ReviewRequest $request);
}
