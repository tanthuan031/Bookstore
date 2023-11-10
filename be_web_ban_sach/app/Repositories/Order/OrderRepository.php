<?php

namespace App\Repositories\Order;

use App\Http\Traits\ApiResponse;
use App\Models\Book;
use App\Models\Order;
use App\Models\OrderItem;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderRepository implements OrderInterface
{

    use ApiResponse;

    /**
     * @throws Exception
     */
    public function createOrder(Request $request)
    {
        DB::beginTransaction();
        try {
            $orderItemAvailable = array();
            $orderItemUnavailable = array();

            $new_order = Order::query()->insertGetId(
                [
                    'user_id' => $request->user_id,
                    'order_date' => Carbon::now('Asia/Ho_Chi_Minh')->toDateTimeString(),
                    'order_amount' => $request->order_amount,
                ]
            );

            $cart = $request->cart;

            foreach($cart as $obj) {
                if (Book::query()->where('id', $obj['book_id'])->exists()) {
                    $orderItemAvailable[] = (object) [
                        'order_id' => $new_order,
                        'book_id' => $obj['book_id'],
                        'quantity' => $obj['quantity'],
                        'price' => $obj['price'],
                    ];
                } else {
                    $orderItemUnavailable[] = (object) [
                        'book_id' => $obj['book_id'],
                        'book_title' => $obj['book_title'],
                        'quantity' => $obj['quantity'],
                        'price' => $obj['price'],
                    ];
                }
            }

            $orderItemAvailable = json_decode(json_encode($orderItemAvailable), true);

            if(!$orderItemUnavailable) {
               OrderItem::query()->insert($orderItemAvailable);
            } else {
                return $this->apiResponse($orderItemUnavailable, 'error', 'Some books are not available', 404);
            }

            DB::commit();

            return $this->apiResponse(null, 'success', 'Place Order Successfully');
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
