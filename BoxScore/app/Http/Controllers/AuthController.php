<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserModel;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\Rules\Password as RulesPassword;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Hash;

class AuthController{

    public function requestPasswordRecover(Request $request){
        $request->validate([
            'email' => 'required|email|exists:users,user_email',
        ],[
            'email.exists' => 'El correo ingresado no se encuentra registrado en el sistema',
        ]);

        $throttleKey = 'password_reset:'.$request->ip();
        
        if (RateLimiter::tooManyAttempts($throttleKey, 1)) {
            $seconds = RateLimiter::availableIn($throttleKey);
            return back()->withErrors([
                'email' => "Por favor espere $seconds segundos antes de intentar nuevamente."
            ]);
        }

        RateLimiter::hit($throttleKey, 60);
        $user = UserModel::where('user_email', $request->email)->first();

        if (!$user) {
            return back()->withErrors(['email' => 'No encontramos un usuario con ese correo electrónico.']);
        }

        $status = Password::broker()->sendResetLink(
            ['user_email' => $request->email]
        );
        
        if ($status === Password::RESET_LINK_SENT) {
            RateLimiter::clear($throttleKey);
        }

        return $status === Password::RESET_LINK_SENT
            ? back()->with('status', 'Hemos enviado un enlace de recuperación a tu correo electrónico.')
            // ? back()->with('status', __($status))
            : back()->withErrors(['email' => __($status)]);
    
    }

    public function reset(Request $request){
        
        $request->validate([
            'token' => 'required',
            'email'=> 'required|email',
            'password'=> ['required', 'confirmed', RulesPassword::defaults()]
        ],
        [
            
            'password.required' => 'La contraseña es obligatoria',
            'password.confirmation' => 'Las contraseñas no coinciden',
        ]);

        $credentials = [
            'user_email' => $request->email,
            'password' => $request->password,
            'password_confirmation' => $request->password_confirmation,
            'token' => $request->token
        ];


        $status = Password::reset(
            $credentials,
            function (UserModel $user, string $password) use ($request) {
                \Log::info('CALLBACK EJECUTADO para usuario: ' . $user->user_email);

                $user->user_password = Hash::make($password); // 👈 usa $password, no $request->password
                $user->save();
            }
        );
        

        if ($status === Password::PASSWORD_RESET) {
            return redirect()->route('login')->with('flash', [
            'title' => 'Éxito',
            'message' => 'Contraseña restablecida correctamente'
        ]);

        }

        return back()
            ->withInput($request->only('email', 'password', 'password_confirmation'))
            ->with('flash', [
                'title' => 'error',
                'message' => __($status),
                
            ]);

    }
}
