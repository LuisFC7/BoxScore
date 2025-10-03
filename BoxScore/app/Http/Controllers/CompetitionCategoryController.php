<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CompetitionCategoryModel;

class CompetitionCategoryController{
    
    public function store($userId, $competitionId, $categorias){

        foreach  ($categorias as $catId){
            CompetitionCategoryModel::create([
                'organizer_comp_id' =>$userId,
                'competition_id' => $competitionId,
                'category_id'=>$catId
            ]);
        }
        return true;
    }
}
