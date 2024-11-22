<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Product;

class UpdateProductImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'products:update-images';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update product images based on class and type';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        // Fetch all products
        $products = Product::all();

        foreach ($products as $product) {
            // Generate the new image URL
            $newImage = "https://via.placeholder.com/150?text={$product->class}+{$product->type}";

            // Update the product's image field
            $product->image = $newImage;
            $product->save();

            // Log progress to the console
            $this->info("Updated product ID {$product->id} with new image: {$newImage}");
        }

        $this->info('All product images updated successfully.');
        return 0;
    }
}
