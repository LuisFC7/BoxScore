<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\UserModel;
use App\Models\CompetitionModel;
use App\Models\CategoryModel;
use Inertia\Inertia;

class CompetitionController{
    
    
    public function showCompetitionOrganized(){
        $user = Auth::user();
        $categories = CategoryModel::select(
            'id',
            'category_name',
            'category_genre'
        )->get();

        return Inertia::render('Auth/competitionProfile',[
            'competitionData' => [
                'email' => $user->user_email,
                'fullname'=> $user->user_name,
                'avatarUrl' => $user->user_img,
                'categories'=>$categories
                
            ]
        ]);
    }
}
