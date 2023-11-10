<?php

namespace App\Repositories\Author;

use App\Http\Traits\ApiResponse;
use App\Models\Author;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthorRepository implements AuthorInterface
{
    use ApiResponse;

    private Builder $query;

    public function __construct()
    {
        $this->query = Author::query();
    }

    public function getRecords(Request $request): JsonResponse
    {
        $conditions = $request->get('mode');
        $data = [];

        if ($conditions) {
            foreach ($conditions as $key => $value) {
                if ($key === 'author_name' && $value === 'on') {
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
