<?php

namespace App\Providers;

use App\Repositories\Book\BookInterface;
use App\Repositories\Book\BookRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        // Register Repository
        $this->app->bind(
            BookInterface::class,
            BookRepository::class
        );
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
