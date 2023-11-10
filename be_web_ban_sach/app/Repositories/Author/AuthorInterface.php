<?php

namespace App\Repositories\Author;
use Illuminate\Http\Request;

interface AuthorInterface
{
    public function getRecords(Request $request);
}
