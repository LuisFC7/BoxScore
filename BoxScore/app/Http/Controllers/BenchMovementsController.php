<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\UserModel;

class BenchMovementsController{
 

    //Envia los datos necesarios para mostrar los bench Marks de los usuarios
    public function showBenchMarkMovementsUser(){
        $user = Auth::user();
        
        $queryUser = UserModel::with('benchmarkMovements')
            ->where('user_email', $user->user_email)
            ->first();

       
        return Inertia::render('Auth/profileMarks',[
            'markUser' => [
                'email' => $user->user_email,
                'fullname'=> $user->user_name,
                'avatarUrl' => $user->user_img,
                'benchmarkMovements' => $queryUser->benchmarkMovements
            ]
        ]);
    }
}
