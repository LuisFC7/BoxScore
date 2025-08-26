<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController{

    //Shows the form to register an account
    public function showFormRegisterUser(){
        return Inertia::render('register');
    }

    
}
