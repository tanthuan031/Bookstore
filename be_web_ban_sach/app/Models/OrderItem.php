<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItem extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'order_item';

    public function Order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function Book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }
}
