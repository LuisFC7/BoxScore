<?php

use App\Models\UserModel;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use App\Http\Controllers\UserController;

use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Register
Route::get('/register', [UserController::class, 'showFormRegisterUser']);
Route::post('/user-store', [UserController::class, 'store'])->name('user.store');

//Routes for verification Email
Route::get('/email/verify', function () {
    return Inertia::render('Auth/VerifyEmail'); // Pantalla React que vas a crear
})->middleware('auth')->name('verification.notice');

// Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
//     $request->fulfill();
//     return redirect('/dashboard');
// })->middleware(['auth', 'signed'])->name('verification.verify');
Route::get('/email/verify/{id}/{hash}', function ($id, $hash) {
    // Buscar usuario
    $user = UserModel::findOrFail($id);

    // Validar hash de email
    if (! hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
        abort(403, 'Enlace de verificación inválido');
    }

    if (! $user->hasVerifiedEmail()) {
        $user->markEmailAsVerified();

        $user->user_state = 1;
        $user->save();
    }

    // return redirect('/login')->with('verified', true); 
    return redirect()->route('home')->with('flash', [
            'title' => '¡Email verificado!',
            'message' => 'Tu correo fue verificado correctamente. Ahora puedes iniciar sesión.'
        ]);
})->middleware(['signed'])->name('verification.verify');

Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();

    return back()->with('message', 'Se ha enviado un nuevo link de verificación.');
})->middleware(['auth', 'throttle:6,1'])->name('verification.send');


// Página de login
Route::get('/login', function () {
    return Inertia::render('login');
})->name('login');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
