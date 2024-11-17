<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }

    public function promo()
    {
        $products = Product::select('products.*')
            ->join('reviews', 'reviews.product_id', '=', 'products.id')
            ->selectRaw('AVG(reviews.rating) as avg_rating')
            ->groupBy('products.id')
            ->orderByDesc('avg_rating')
            ->take(6)
            ->get();

        return response()->json($products);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $product = Product::create($request->validate([
            'price' => 'required|numeric',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'class' => 'required|string',
            'type' => 'required|string',
            'count' => 'required|integer',
            'model' => 'nullable|string',
            'brand' => 'nullable|string',
        ]));

        return response()->json($product, 201);
    }

    public function show(Product $product)
    {
        return response()->json($product);
    }

    public function edit(Product $product)
    {
        //
    }

    public function update(Request $request, Product $product)
    {
        $product->update($request->validate([
            'price' => 'numeric',
            'title' => 'string|max:255',
            'description' => 'nullable|string',
            'class' => 'string',
            'type' => 'string',
            'count' => 'integer',
            'model' => 'nullable|string',
            'brand' => 'nullable|string',
        ]));

        return response()->json($product);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(['message' => 'Product deleted']);
    }
}
