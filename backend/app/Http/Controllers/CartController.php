<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

    public function addToCart(Product $product)
    {
        $user = Auth::user();

        if ($product->count <= 0) {
            return response()->json(['error' => 'not enough products'], 409);
        }

        $cartItem = Cart::where('product_id', $product->id)
            ->where('user_id', $user->id)
            ->first();

        if ($cartItem) {
            $cartItem->count += 1;
            $cartItem->save();
        } else {
            $cartItem = Cart::create([
                'product_id' => $product->id,
                'user_id' => $user->id,
                'count' => 1,
            ]);
        }

        return response()->json($cartItem, 201);
    }

    public function decrementCartItem(Product $product)
    {
        $user = Auth::user();

        $cartItem = Cart::where('product_id', $product->id)
            ->where('user_id', $user->id)
            ->first();

        if (!$cartItem) {
            return response()->json(['error' => 'Cart not found'], 404);
        }

        if ($cartItem->quantity == 0) {
            return response()->json(['error' => 'not enough products'], 409);
        }

        $cartItem->count -= 1;
        $cartItem->save();

        return response()->json($cartItem, 201);
    }

    public function incrementCartItem(Product $product)
    {
        $user = Auth::user();

        $cartItem = Cart::where('product_id', $product->id)
            ->where('user_id', $user->id)
            ->first();

        if (!$cartItem) {
            return response()->json(['error' => 'Cart not found'], 404);
        }

        if ($product->count <= $cartItem->quantity + 1) {
            return response()->json(['error' => 'not enough products'], 409);
        }


        $cartItem->count += 1;
        $cartItem->save();

        return response()->json($cartItem, 201);
    }

    public function removeFromCart(Request $request)
    {

        $ids = $request->input('ids');
        $user = Auth::user();

        $cartItem = Cart::whereIn('product_id', $ids)
            ->where('user_id', $user->id)
            ->delete();

        return response()->json($cartItem, 201);
    }

    public function getCartFromUser()
    {
        $user = Auth::user();

        if (!$user) {
            $user = auth('sanctum')->user();
        }

        $cart = Cart::where('user_id', $user->id)->with('product')->get();

        if (!$cart) {
            return response()->json(['error' => 'Cart not found'], 404);
        }

        $result = [];

        foreach ($cart as $item) {
            $product = $item->product;
            $product->quantity = $item->count;
            $result[] = $product;
        }

        return response()->json(['cart' => $result], 200);
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
