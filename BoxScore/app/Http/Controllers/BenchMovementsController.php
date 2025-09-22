<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\UserModel;
use App\Models\BenchMovementsModel;
use Illuminate\Support\Facades\Validator;

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

    public function storeBenchMarksMovements(Request $request)
{
    $user = Auth::user();

    // Extraemos el primer elemento de benchmarkMovements
    $benchmarkData = $request->input('benchmarkMovements.0', []);

    $validated = Validator::make($benchmarkData, [
        'front_squat' => 'nullable|numeric',
        'overhead_squat' => 'nullable|numeric',
        'shoulder_press' => 'nullable|numeric',
        'push_press' => 'nullable|numeric',
        'push_jerk' => 'nullable|numeric',
        'deadlift' => 'nullable|numeric',
        'sumo_high_pull' => 'nullable|numeric',
        'power_clean' => 'nullable|numeric',
        'power_snatch' => 'nullable|numeric',
        'clean_and_jerk' => 'nullable|numeric',
        'snatch' => 'nullable|numeric',
    ])->validated();

    
    $benchMarks = BenchMovementsModel::updateOrCreate(
        ['benchmark_user_id' => $user->id],
        $validated
    );

    return redirect()->route('bench-movements')->with('flash', [
        'title' => 'Éxito',
        'message' => 'Bench Marks actualizados correctamente'
    ]);
}

}
