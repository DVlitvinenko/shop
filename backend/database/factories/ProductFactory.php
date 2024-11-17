<?php

namespace Database\Factories;

use App\Enums\ClothingClass;
use App\Enums\ClothingType;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    public function definition()
    {
        return [
            'price' => fake()->randomFloat(2, 100, 100000),
            'title' => fake()->words(2, true),
            'description' => fake()->sentence(),
            'class' => fake()->randomElement(ClothingClass::cases())->value,
            'type' => fake()->randomElement(ClothingType::cases())->value,
            'count' => fake()->numberBetween(1, 100),
            'model' => fake()->word(),
            'brand' => fake()->company(),
            'color' => fake()->colorName(),
        ];
    }
}
