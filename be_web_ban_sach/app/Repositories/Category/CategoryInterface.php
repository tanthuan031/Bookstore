<?php

namespace App\Repositories\Category;
use Illuminate\Http\Request;

interface CategoryInterface
{
    public function getRecords(Request $request);
}
