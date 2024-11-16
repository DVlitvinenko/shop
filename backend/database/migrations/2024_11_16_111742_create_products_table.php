<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->decimal('price', 10, 2);
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('class')->nullable();
            $table->string('type')->nullable();
            $table->integer('count');
            $table->string('model')->nullable();
            $table->string('brand')->nullable();
            $table->string('image')->nullable();
            $table->string('color')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('products');
    }
};
