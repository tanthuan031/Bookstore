<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'order';

    public function User(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function OrderItem(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
}
