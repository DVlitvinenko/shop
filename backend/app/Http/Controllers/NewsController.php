<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function index()
    {
        $news = News::all();
        return response()->json($news);
    }

    public function store(Request $request)
    {
        $news = News::create($request->validate([
            'title' => 'required|string|max:255',
            'date' => 'required|date',
            'description' => 'nullable|string',
        ]));

        return response()->json($news, 201);
    }

    public function show(News $news)
    {
        return response()->json($news);
    }

    public function update(Request $request, News $news)
    {
        $news->update($request->validate([
            'title' => 'string|max:255',
            'date' => 'date',
            'description' => 'nullable|string',
        ]));

        return response()->json($news);
    }

    public function destroy(News $news)
    {
        $news->delete();
        return response()->json(['message' => 'News item deleted']);
    }
}
