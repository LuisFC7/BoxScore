<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\UserModel;
use App\Models\CategoryModel;
use Inertia\Inertia;

class CategoryController{
    
    public function showCategories(){
        $user = Auth::user();

        $categories = CategoryModel::select('id','category_name', 'category_genre')->get();
        dd($categories);
        
        return Inertia::render('Auth/CategorySelector',[
            'categories' => $categories,
        ]);
        
    }
}
