<?php

namespace App\Repositories\Book;

use Illuminate\Http\Request;

interface BookInterface
{
    public function getRecords(Request $request);

    public function getBookById($id);
}
