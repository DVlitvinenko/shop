<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Product;
use App\Models\User;

class ReviewFactory extends Factory
{
    public function definition()
    {
        return [
            'product_id' => Product::inRandomOrder()->first()->id,
            'user_id' => User::inRandomOrder()->first()->id,
            'title' => fake()->sentence(),
            'rating' => fake()->numberBetween(1, 5),
            'body' => fake()->paragraph(),
        ];
    }
}
