<?php

namespace App\Repositories\Category;

use App\Http\Traits\ApiResponse;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;

class CategoryRepository implements CategoryInterface
{
    use ApiResponse;

    private Builder $query;

    public function __construct()
    {
        $this->query = Category::query();
    }

    public function getRecords(Request $request): JsonResponse
    {
        $conditions = $request->get('mode');
        $data = [];

        if ($conditions) {
            foreach ($conditions as $key => $value) {
                if ($key === 'category_name' && $value === 'on') {
                    $data = $this->query
                        ->select($key)
                        ->orderBy($key)
                        ->get();
                }
            }
        }

        if (!$conditions) {
            $data = $this->query->get();
        }

        return $this->apiResponse($data, 'success', 'Get Data Successfully');
    }
}
