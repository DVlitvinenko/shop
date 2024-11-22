<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthorizationController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\UserController;


Route::post('register', [AuthorizationController::class, 'register']);
Route::post('login', [AuthorizationController::class, 'login']);


Route::post('products', [ProductController::class, 'getProductByFilters']);

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::post('products/create', [ProductController::class, 'store']);
    Route::put('products/{product}', [ProductController::class, 'update']);
    Route::delete('products/{product}', [ProductController::class, 'destroy']);
});

Route::get('products/{product}', [ProductController::class, 'getProduct']);

Route::apiResource('reviews', ReviewController::class);
Route::apiResource('orders', OrderController::class);
Route::apiResource('news', NewsController::class);
Route::apiResource('cart', CartController::class);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('user', [UserController::class, 'getUser']);
    Route::post('logout', [AuthorizationController::class, 'logout']);
});
