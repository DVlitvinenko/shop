<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index()
    {
        $cartItems = Cart::all();
        return response()->json($cartItems);
    }

    public function store(Request $request)
    {
        $cartItem = Cart::create($request->validate([
            'product_id' => 'required|exists:products,id',
            'user_id' => 'required|exists:users,id',
            'count' => 'required|integer|min:1',
        ]));

        return response()->json($cartItem, 201);
    }

    public function show(Cart $cart)
    {
        return response()->json($cart);
    }

    public function update(Request $request, Cart $cart)
    {
        $cart->update($request->validate([
            'product_id' => 'exists:products,id',
            'user_id' => 'exists:users,id',
            'count' => 'integer|min:1',
        ]));

        return response()->json($cart);
    }

    public function destroy(Cart $cart)
    {
        $cart->delete();
        return response()->json(['message' => 'Cart item deleted']);
    }
}
