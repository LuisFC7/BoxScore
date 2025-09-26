<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\UserModel;
use App\Models\WodModel;
use Inertia\Inertia;

class WodController{
    
    // Envio de datos a mostrar sobre los wods de los usuarios
    public function showWodsUser(){
        $user = Auth::user();

        $queryUser = UserModel::with('wodUserRelation')
            ->where('user_email', $user->user_email)
            ->first();

        return Inertia::render('Auth/profileWods',[
            'wodlist'=>[
                'email' => $user->user_email,
                'fullname'=> $user->user_name,
                'avatarUrl' => $user->user_img,
                'wods' => $queryUser->wodUserRelation
            ]
        ]);
    }
}
