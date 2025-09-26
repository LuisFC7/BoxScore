<?php

use App\Models\UserModel;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BenchMovementsController;
use App\Http\Controllers\WodController;

use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Register
Route::get('/register', [UserController::class, 'showFormRegisterUser']);
Route::post('/user-store', [UserController::class, 'store'])->name('user.store');

// Forgot Password
Route::get('/forgot-password', [UserController::class, 'showFormPasswordReset']);

//Routes for verification Email
Route::get('/email/verify', function () {
    return Inertia::render('Auth/VerifyEmail');
})->middleware('auth')->name('verification.notice');

//Route para enviar enlace de recuperación de password
Route::post('/sendLinkPassword', [AuthController::class, 'requestPasswordRecover'])
    ->middleware('guest')
    ->name('sendLinkPassword');
    
// Redirecciona del email al page ResetPasswordForm
Route::get('/reset-password/{token}', function (string $token) {
    // Captura el email del query string
    $email = request()->query('email');

    return Inertia::render('Auth/ResetPasswordForm', [
        'token' => $token,
        'email' => $email, // <--- ahora React recibirá el email
    ]);
})->middleware('guest')->name('password.reset');

//Route para enviar enlace de recuperación de password
Route::post('/save-password', [AuthController::class, 'reset'])
    ->middleware('guest')
    
->name('save-password');


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
    $request->validate([
        'email' => 'required|email|exists:users,user_email',
    ]);

    $user = UserModel::where('user_email', $request->email)->first();

    if ($user) {
        $user->sendEmailVerificationNotification();

        // Retornamos la misma página Inertia con un nuevo status
        return Inertia::render('Auth/VerifyEmail', [
            'status' => 'verification-link-sent',
            'email' => $request->email,
        ]);
    }

    return Inertia::render('Auth/VerifyEmail', [
        'status' => 'error',
        'email' => $request->email,
    ]);
})->middleware('throttle:6,1')->name('verification.send');


// Página de login
Route::get('/login', function () {
    return Inertia::render('login');
})->name('login');

Route::post('/user-login', [UserController::class, 'loginUser']) -> name('user.login');
Route::post('/logout', [UserController::class, 'logoutUser'])->name('user.logout');


// Rutas protegidas
Route::middleware(['auth'])->group(function () {

    Route::get('/dashboard', function () {
        $user = Auth::user();
        return Inertia::render('Auth/dashboard', [
            'user' => $user->user_name,
            'avatarUrl' => $user->user_img ? '/storage/' . $user->user_img : null,
        ]);
    })->middleware('auth')->name('dashboard');

    Route::get('/profile', [UserController::class,'showFormEditUser'])
        ->middleware('auth')
        ->name('profile');

    Route::post('/profile-edit', [UserController::class, 'updateUser'])
        ->middleware('auth');

    Route::get('/bench-movements', [BenchMovementsController::class,'showBenchMarkMovementsUser'])
        ->middleware('auth')
        ->name('bench-movements');

    Route::post('update-bench-movements', [BenchMovementsController::class, 'storeBenchMarksMovements'])
        ->middleware('auth')
        ->name('update-bench-movements');

    // Wods Routes
    Route::get('/wods', [WodController::class,'showWodsUser'])
        ->middleware('auth')
        ->name('wods');
    
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
