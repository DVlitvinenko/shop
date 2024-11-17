<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::all();
        return response()->json($orders);
    }

    public function store(Request $request)
    {
        $order = Order::create($request->validate([
            'product_id' => 'required|exists:products,id',
            'user_id' => 'required|exists:users,id',
            'count' => 'required|integer|min:1',
            'date' => 'required|date',
            'status' => 'required|string|max:255',
            'price' => 'required|numeric',
        ]));

        return response()->json($order, 201);
    }

    public function show(Order $order)
    {
        return response()->json($order);
    }

    public function update(Request $request, Order $order)
    {
        $order->update($request->validate([
            'product_id' => 'exists:products,id',
            'user_id' => 'exists:users,id',
            'count' => 'integer|min:1',
            'date' => 'date',
            'status' => 'string|max:255',
            'price' => 'numeric',
        ]));

        return response()->json($order);
    }

    public function destroy(Order $order)
    {
        $order->delete();
        return response()->json(['message' => 'Order deleted']);
    }
}
