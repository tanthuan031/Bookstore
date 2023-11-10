<?php

namespace App\Repositories\Book;

use App\Http\Resources\BookResource;
use App\Http\Traits\ApiResponse;
use App\Models\Book;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BookRepository implements BookInterface
{
    use ApiResponse;

    public function getRecords(Request $request): JsonResponse
    {
        $dataPaginate = [];

        $paginate = $request->get('mode');

        $per_page = $request->query('per_page') ?
            $request->query('per_page') : config('app.per_page');

        $limit = $request->query('limit') ?
            $request->query('limit') : null;

        $data = Book::query()
            ->FilterBase($request)
            ->SortBase($request);

        if($paginate) {
            foreach ($paginate as $key => $value) {
                if ($key === 'paginate' && $value === 'on') {
                    $dataPaginate = $data->paginate($per_page);
                }
            }
        }

        if (!is_null($limit)) {
            $data = $data->limit($limit);
        }

        if (!empty($dataPaginate)) {
            $dataPaginate = BookResource::collection($dataPaginate)->response()->getData();
            return $this->apiResponse($dataPaginate, 'success', 'Get Data Successfully');
        } else {
            $data = BookResource::collection($data->get());
            return $this->apiResponse($data, 'success', 'Get Data Successfully');
        }
    }

    public function getBookById($id)
    {
        $data = BookResource::collection(
            Book::query()
            ->JoinWithBooks()
            ->where('book.id', '=', $id)
            ->groupBy('book.id',
                'book.book_title',
                'author.author_name',
                'category.category_name',
                'book.book_price',
                'book.book_cover_photo',
                'book.book_summary',
                'check_discount.discount_price',
                'check_discount.final_price')
            ->get()
        );

        if ($data->isEmpty()) {
            abort(404);
        } else {
            return $this->apiResponse($data, 'success', 'Get Data Successfully');
        }
    }
}

