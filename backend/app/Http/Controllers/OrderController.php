<?php

namespace App\Http\Controllers;

use App\Enums\OrderStatus;
use App\Models\Cart;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function order(Request $request)
    {
        $ids = $request->input('ids');

        $user = Auth::user();

        $cartItems = Cart::where('user_id', $user->id)->whereIn('product_id', $ids)->get();

        if ($cartItems->isEmpty()) {
            return response()->json(['error' => 'Cart is empty'], 400);
        }

        $createdOrders = [];

        foreach ($cartItems as $cartItem) {
            $product = $cartItem->product;

            if ($product->count <= 0) {
                return response()->json(['error' => 'Product ' . $product->name . ' is out of stock'], 409);
            }

            $order = Order::create([
                'product_id' => $product->id,
                'user_id' => $user->id,
                'count' => $cartItem->count,
                'date' => now(),
                'status' => OrderStatus::PENDING->value,
                'price' => $product->price * $cartItem->count,
            ]);

            $createdOrders[] = $order;

            $product->count -= $cartItem->count;
            $product->save();
        }

        Cart::where('user_id', $user->id)->delete();

        return response()->json($createdOrders, 201);
    }


    public function markAsPaid(Order $order)
    {
        $order->status = OrderStatus::PAID->value;
        $order->save();

        return response()->json($order);
    }

    public function shipOrder(Order $order)
    {
        $order->status = OrderStatus::SHIPPED->value;
        $order->save();

        return response()->json($order);
    }

    public function deliverOrder(Order $order)
    {
        $order->status = OrderStatus::DELIVERED->value;
        $order->save();

        return response()->json($order);
    }

    public function cancelOrder(Order $order)
    {
        $order->status = OrderStatus::CANCELED->value;
        $order->save();

        return response()->json($order);
    }

    public function getOrderFromUser(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            $user = auth('sanctum')->user();
        }

        $orders = Order::where('user_id', $user->id)
            ->with('product')->orderBy('updated_at', 'desc')
            ->get();

        foreach ($orders as $order) {
            $product = $order->product;

            foreach ($product->getAttributes() as $key => $value) {
                if ($key != "price" && $key != "count" && $key != "id") {
                    $order->$key = $value;
                }
            }
            unset($order->product, $order->user_id);
        }

        return response()->json(['orders' => $orders], 200);
    }
}
