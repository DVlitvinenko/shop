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
            'price' => $this->faker->randomFloat(2, 100, 100000),
            'title' => $this->faker->words(2, true),
            'description' => $this->faker->sentence(),
            'class' => $this->faker->randomElement(ClothingClass::cases())->value,
            'type' => $this->faker->randomElement(ClothingType::cases())->value,
            'count' => $this->faker->numberBetween(1, 100),
            'model' => $this->faker->word(),
            'brand' => $this->faker->company(),
            'color' => $this->faker->colorName(),
        ];
    }
}
