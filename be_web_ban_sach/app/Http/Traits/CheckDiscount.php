<?php

namespace App\Http\Traits;

use App\Models\Book;

trait CheckDiscount
{
    public function checkDiscount()
    {
        $currentDate = date('Y-m-d');

        return Book::query()
            ->leftJoin('discount', 'book.id', '=', 'discount.book_id')
            ->select('book.id', 'discount.discount_price')
            ->selectRaw("
                CASE
                    WHEN discount.discount_price IS NULL
                    THEN book.book_price

                    WHEN discount.discount_price IS NOT NULL
                    AND discount.discount_end_date < ?
                    OR discount.discount_start_date > ?
                    THEN book.book_price

                    WHEN discount.discount_price IS NOT NULL
                    AND discount.discount_start_date <= ?
                    THEN discount.discount_price

                    END
                AS final_price", [$currentDate, $currentDate, $currentDate]);
    }
}
