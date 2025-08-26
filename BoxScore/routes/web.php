<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/register', [UserController::class, 'showFormRegisterUser']);


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
