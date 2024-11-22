<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }

    public function getProduct(Product $product)
    {
        $productItem = Product::query()
            ->selectRaw(
                'products.*,
            COALESCE(AVG(reviews.rating), 0) as average_rating,
            COUNT(reviews.id) as reviews_count'
            )
            ->leftJoin('reviews', 'reviews.product_id', '=', 'products.id')
            ->where('products.id', $product->id)
            ->groupBy('products.id')
            ->with([
                'reviews' => function ($query) {
                    $query->select('reviews.*')
                        ->with('user:id,name');
                }
            ])
            ->first();

        $reviews = $productItem->reviews;
        unset($productItem->reviews);

        if (!$productItem) {
            return response()->json(['error' => 'Product not found'], 404);
        }


        return response()->json([
            'product' => $productItem,
            'reviews' => $reviews,
        ]);
    }



    public function getProductByFilters(Request $request)
    {
        $price = $request->input('price', []);
        $text = $request->input('text');
        $classes = $request->input('class', []);
        $types = $request->input('type', []);
        $colors = $request->input('color', []);
        $brand = $request->input('brand');
        $count = $request->input('count', []);
        $model = $request->input('model');
        $sort = $request->input('sort');
        $limit = $request->input('limit', 6);
        $offset = $request->input('offset', 0);

        $baseQuery = Product::query()
            ->selectRaw(
                'products.*,
            COALESCE(AVG(reviews.rating), 0) as average_rating,
            COUNT(reviews.id) as reviews_count'
            )
            ->leftJoin('reviews', 'reviews.product_id', '=', 'products.id')
            ->groupBy('products.id');

        // Фильтры
        if (!empty($price['min'])) {
            $baseQuery->where('price', '>=', $price['min']);
        }

        if (!empty($price['max'])) {
            $baseQuery->where('price', '<=', $price['max']);
        }

        if (!empty($text)) {
            $baseQuery->where(function ($q) use ($text) {
                $q->where('title', 'like', '%' . $text . '%')
                    ->orWhere('description', 'like', '%' . $text . '%');
            });
        }

        if (!empty($classes)) {
            $baseQuery->whereIn('class', $classes);
        }

        if (!empty($colors)) {
            $baseQuery->whereIn('color', $colors);
        }

        if (!empty($types)) {
            $baseQuery->whereIn('type', $types);
        }

        if (!empty($brand)) {
            $baseQuery->where('brand', $brand);
        }

        if (!empty($count['min'])) {
            $baseQuery->where('count', '>=', $count['min']);
        }

        if (!empty($count['max'])) {
            $baseQuery->where('count', '<=', $count['max']);
        }

        if (!empty($model)) {
            $baseQuery->where('model', 'like', '%' . $model . '%');
        }

        // Считаем общее количество продуктов БЕЗ groupBy
        $totalCountQuery = Product::query();

        if (!empty($price['min'])) {
            $totalCountQuery->where('price', '>=', $price['min']);
        }

        if (!empty($price['max'])) {
            $totalCountQuery->where('price', '<=', $price['max']);
        }

        if (!empty($text)) {
            $totalCountQuery->where(function ($q) use ($text) {
                $q->where('title', 'like', '%' . $text . '%')
                    ->orWhere('description', 'like', '%' . $text . '%');
            });
        }

        if (!empty($classes)) {
            $totalCountQuery->whereIn('class', $classes);
        }

        if (!empty($types)) {
            $totalCountQuery->whereIn('type', $types);
        }

        if (!empty($colors)) {
            $totalCountQuery->whereIn('color', $colors);
        }

        if (!empty($brand)) {
            $totalCountQuery->where('brand', $brand);
        }

        if (!empty($count['min'])) {
            $totalCountQuery->where('count', '>=', $count['min']);
        }

        if (!empty($count['max'])) {
            $totalCountQuery->where('count', '<=', $count['max']);
        }

        if (!empty($model)) {
            $totalCountQuery->where('model', 'like', '%' . $model . '%');
        }

        $totalCount = $totalCountQuery->count();

        $sortOptions = [
            'price-asc' => ['price', 'asc'],
            'price-desc' => ['price', 'desc'],
            'rating-asc' => ['average_rating', 'asc'],
            'rating-desc' => ['average_rating', 'desc'],
            'count-asc' => ['count', 'asc'],
            'count-desc' => ['count', 'desc'],
            'default' => ['price', 'asc'],
        ];

        $sortField = $sortOptions[$sort] ?? $sortOptions['default'];
        $baseQuery->orderBy($sortField[0], $sortField[1]);

        // Пагинация
        $products = $baseQuery->skip($offset * $limit)
            ->take($limit)
            ->get();

        return response()->json([
            'products' => $products,
            'total_count' => $totalCount
        ]);
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
