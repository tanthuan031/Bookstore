<?php

namespace App\Repositories\Order;
use Illuminate\Http\Request;

interface OrderInterface
{
    public function createOrder(Request $request);
}
