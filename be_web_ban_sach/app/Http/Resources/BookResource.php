<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BookResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $arrayData = [
            'id' => $this->id,
            'book_title' => $this->book_title,
            'author_name' => $this->author_name,
            'book_cover_photo' => $this->book_cover_photo,
            'book_price' => $this->book_price,
            'discount_price' => $this->discount_price,
            'final_price' => $this->final_price,
            'is_discount' => $this->final_price === $this->discount_price ? true : false
        ];

        if ($request->route()->uri() === 'api/books/{book}') {
            $arrayData['book_summary'] = $this->book_summary;
            $arrayData['category_name'] = $this->category_name;
        }

        return $arrayData;
    }
}
