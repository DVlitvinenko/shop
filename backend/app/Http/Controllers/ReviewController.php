<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index()
    {
        $reviews = Review::all();
        return response()->json($reviews);
    }

    public function store(Request $request)
    {
        $review = Review::create($request->validate([
            'product_id' => 'required|exists:products,id',
            'user_id' => 'required|exists:users,id',
            'title' => 'required|string|max:255',
            'rating' => 'required|integer|min:1|max:5',
            'body' => 'nullable|string',
        ]));

        return response()->json($review, 201);
    }

    public function getReviews(Request $request)
    {
        $sort = $request->input('sort') ?? 'asc';
        $limit = $request->input('limit') ?? 10;

        $reviews = Review::orderBy('rating', $sort)->take($limit)->with(['user:id,name'])->get();

        if (!$reviews) {
            return response()->json(['error' => 'not found'], 404);
        }

        return response()->json(['reviews' => $reviews], 200);
    }

    public function getReview(Review $review)
    {

        $reviews = Review::where('id', $review->id)->with(['user:id,name'])->first();

        return response()->json(['reviews' => $reviews], 200);
    }

    public function show(Review $review)
    {
        return response()->json($review);
    }

    public function update(Request $request, Review $review)
    {
        $review->update($request->validate([
            'product_id' => 'exists:products,id',
            'user_id' => 'exists:users,id',
            'title' => 'string|max:255',
            'rating' => 'integer|min:1|max:5',
            'body' => 'nullable|string',
        ]));

        return response()->json($review);
    }

    public function destroy(Review $review)
    {
        $review->delete();
        return response()->json(['message' => 'Review deleted']);
    }
}
