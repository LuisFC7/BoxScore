<?php

namespace App\Http\Controllers;

use App\Models\UserModel;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController{

    //Shows the form to register an account
    public function showFormRegisterUser(){
        return Inertia::render('register');
    }

    public function store(Request $request){
        $request->validate([
            'name'=> 'required|string|max:255',
            'email'=> 'required|email|unique:users,user_email',
            'password'=> ['required', 'confirmed', Password::defaults()]
        ],
        [
            'name.required' => 'El nombre es obligatorio',
            'email.required' => 'El email es obligatorio',
            'email.unique' => 'El email introducido ya se encuentra en uso',
            'password.required' => 'La contraseña es obligatoria',
            'password.min' => 'La contraseña debe tener al menos 12 caracteres.',
            'password.letters' => 'La contraseña debe contener al menos una letra.',
            'password.mixed' => 'La contraseña debe incluir mayúsculas y minúsculas.',
            'password.numbers' => 'La contraseña debe contener al menos un número.',
            'password.symbols' => 'La contraseña debe contener al menos un símbolo.',
            'password.confirmation' => 'Las contraseñas no coinciden',
        ]);

        $user = UserModel::create([
            'user_name' => $request->name,
            'user_email' => $request->email,
            'user_password' => Hash::make($request->password)
        ]);

        return redirect()->route('home')->with('flash', [
            'title' => 'Registro exitoso',
            'message' => 'Tu cuenta ha sido creada correctamente.'
        ]);

    }
}
