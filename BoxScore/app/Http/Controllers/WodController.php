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

    public function storeWodsUser(Request $request){
        $user = Auth::user();

        $validated = $request->validate([
            'wod_name' => 'required|string|max:255',
            'wod_protocol'  => 'nullable|string|max:255',
            'wod_description'  => 'nullable|string|max:255',
            'wod_score'  => 'nullable|string|max:255',
            'wod_time' => 'nullable|date_format:H:i:s',
            'wod_date' => 'nullable|date_format:Y-m-d'
        ],[
            'wod_name.required' => 'El nombre del wod es obligatorio'
        ]); 

        $wod = WodModel::create([
            'wod_user_id' => $user->id,
            ...$validated
        ]);

        return redirect()->route('wods')->with('flash', [
            'title' => 'Éxito',
            'message' => 'WOD agregado correctamente'
        ]);
    }

    public function deleteWodsUser($id){
        $user = Auth::user();

        $wod = WodModel::where('id', $id)
                    ->where('wod_user_id', $user->id)
                    ->firstOrFail();

        $wod->delete();

        return redirect()->route('wods')->with('flash', [
            'title' => 'Éxito',
            'message' => 'WOD eliminado correctamente'
        ]);
    }

    public function updateWodUser(Request $request, $id) {
        $user = Auth::user();
        
        $validated = $request->validate([
            'wod_name' => 'required|string|max:255',
            'wod_protocol' => 'nullable|string|max:255',
            'wod_description' => 'nullable|string',
            'wod_score' => 'nullable|string|max:255',
            'wod_time' => 'nullable|string',
            'wod_date' => 'nullable|date'
        ], [
            'wod_name.required' => 'El nombre del wod es obligatorio'
        ]);

        $wod = WodModel::where('id', $id)
                    ->where('wod_user_id', $user->id)
                    ->firstOrFail();
        
        // 🔹 Actualizar campo por campo (opcional)
        $wod->update([
            'wod_name' => $validated['wod_name'],
            'wod_protocol' => $validated['wod_protocol'],
            'wod_description' => $validated['wod_description'],
            'wod_score' => $validated['wod_score'],
            'wod_time' => $validated['wod_time'],
            'wod_date' => $validated['wod_date'],
        ]);
        
        return redirect()->route('wods')->with('flash', [
            'title' => 'Éxito',
            'message' => 'WOD actualizado correctamente'
        ]);
    }
}
