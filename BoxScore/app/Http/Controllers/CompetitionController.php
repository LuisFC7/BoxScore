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

    public function storeCompetition(Request $request){
        $user = Auth::user();
       
        $organizer = $user->id;
        $validate = $request->validate([
            'competition_name' => 'required|string|max:255',
            'competition_place' => 'required|string|max:255',
            'competition_place_link' => 'nullable|string|max:255',
            'competition_box_name' => 'required|string|max:255',
            'competition_img' => 'nullable|image|max:2048',
            'competition_description' => 'nullable|string|max:255',
            'competition_fee' => 'nullable|numeric',
            'competition_start_date' => 'required|date_format:Y-m-d',
            'competition_finish_date' => 'nullable|date_format:Y-m-d',
            'competition_categories'=>'array'
        ], [
            'competition_name.required' => 'El nombre de la competencia es obligatorio.',
            'competition_place.required' => 'La dirección de la competencia es obligatoria.',
            'competition_box_name.required' => 'El nombre del box es obligatorio.',
            'competition_img.image' => 'La imagen debe ser un archivo válido.',
            'competition_img.max' => 'La imagen no puede superar los 2MB.',
            'competition_fee.numeric' => 'El precio debe ser un número válido.',
            'competition_start_date.required' => 'La fecha de inicio es obligatoria.',
            'competition_start_date.date_format' => 'La fecha de inicio debe tener el formato YYYY-MM-DD.',
            'competition_finish_date.date_format' => 'La fecha de finalización debe tener el formato YYYY-MM-DD.'
        ]);

        $competition = CompetitionModel::create([
            'competition_organizer_id' => $user->id,
            'competition_status' => '0',
            ...$validate
        ]);

        app(CompetitionCategoryController::class)->store(
            $user->id,
            $competition->id,
            $validate['competition_categories']
        );

        return redirect()->route('wods')->with('flash',[
            'title' => 'Éxito',
            'message' => 'WOD agregado correctamente'
        ]);

    }
}
