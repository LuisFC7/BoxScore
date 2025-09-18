<?php

namespace App\Http\Controllers;

use App\Models\UserModel;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;

use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;

class UserController{

    //Shows the form to register an account
    public function showFormRegisterUser(){
        return Inertia::render('register');
    }

    public function showFormPasswordReset(){
        return Inertia::render('Auth/ForgotPassword');
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

        $user->sendEmailVerificationNotification();
    
       
        return Inertia::render('Auth/VerifyEmail', [
            'status' => session('status'),
            'email' => $request->email, // Pasamos el email al componente React
        ]);

    }

    public function loginUser(Request $request){

        $request->validate([
            'email'    => 'required|email',
            'password'=> ['required', Password::defaults()]
        ]);

        $user = UserModel::where('user_email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->user_password)) {
            
            return back()->withErrors([
                'email' => 'Las credenciales no son válidas.',
            ]);
        }

        Auth::login($user);
        
        return redirect()->route('dashboard');

    }

    public function logoutUser(Request $request){
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/login');
    }

    public function showFormEditUser(){
        $user = Auth::user();
        return Inertia::render('Auth/profileSettings',[
            'profile' => [
                'email' => $user->user_email,
                'fullname'=> $user->user_name,
                'phone' => $user->user_phone,
                'birthdate' => $user->user_birthdate,
                'country' => $user->user_country,
                'state' => $user->user_state,
                'city' => $user->user_city,
                'emergencyphone' => $user->user_phone_emergency_contact,
                'profile_image' => $user->user_img,
            ]
        ]);
    }

    public function updateUser(Request $request){
        $user = Auth::user();

        // Validación
        $validated = $request->validate([
            'fullname'        => 'required|string|max:255',
            'phone'           => 'nullable|string|max:20',
            'birthdate'       => 'nullable|date',
            'country'         => 'nullable|string|max:255',
            'state'           => 'nullable|string|max:255',
            'city'            => 'nullable|string|max:255',
            'emergencyphone'  => 'nullable|string|max:20',
            'profile_image'   => 'nullable|image|max:2048',
            'password'        => ['nullable', 'confirmed', Password::defaults()],
        ], [
            'password.min'         => 'La contraseña debe tener al menos 12 caracteres.',
            'password.letters'     => 'La contraseña debe contener al menos una letra.',
            'password.mixed'       => 'La contraseña debe incluir mayúsculas y minúsculas.',
            'password.numbers'     => 'La contraseña debe contener al menos un número.',
            'password.symbols'     => 'La contraseña debe contener al menos un símbolo.',
            'password.confirmation'=> 'Las contraseñas no coinciden',
        ]);

        // Construir array con los nombres correctos de las columnas
        $updateData = [
            'user_name'   => $validated['fullname'],
            'user_phone'  => $validated['phone'] ?? null,
            'user_birthday' => $validated['birthdate'] ?? null,
            'user_country'  => $validated['country'] ?? null,
            'user_state'    => $validated['state'] ?? null,
            'user_city'     => $validated['city'] ?? null,
            'user_phone_emergency_contact' => $validated['emergencyphone'] ?? null,
        ];

        // Imagen
        if ($request->hasFile('profile_image')) {
            $path = $request->file('profile_image')->store('profile_images', 'public');
            $updateData['user_img'] = $path;
        }

        // Contraseña
        if (!empty($validated['password'])) {
            $updateData['user_password'] = Hash::make($validated['password']);
        }

        // Actualizar usuario
        $user->update($updateData);

        return redirect()->route('dashboard')->with('success', 'Perfil actualizado correctamente');
    }


}
