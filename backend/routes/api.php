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
Route::post('initial', [ProductController::class, 'getInitialData']);
Route::post('products/reviews', [ReviewController::class, 'getReviews']);
Route::get('products/reviews/{review}', [ReviewController::class, 'getReview']);

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::post('products/create', [ProductController::class, 'store']);
    Route::put('products/{product}', [ProductController::class, 'update']);
    Route::delete('products/{product}', [ProductController::class, 'destroy']);
});

Route::get('products/{product}', [ProductController::class, 'getProduct']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/cart', [CartController::class, 'getCartFromUser']);
    Route::post('/cart/remove', [CartController::class, 'removeFromCart']);
    Route::post('/order', [OrderController::class, 'order']);
    Route::post('/cart/increment/{product}', [CartController::class, 'incrementCartItem']);
    Route::post('/cart/decrement/{product}', [CartController::class, 'decrementCartItem']);
    Route::post('/products/cart/{product}', [CartController::class, 'addToCart']);
    Route::get('user', [UserController::class, 'getUser']);
    Route::post('logout', [AuthorizationController::class, 'logout']);
});
