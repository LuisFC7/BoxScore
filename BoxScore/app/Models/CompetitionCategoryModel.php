<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class CompetitionCategoryModel extends Model{

    use notifiable;
    
    protected $table =  'competition_categories';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable =[
        'organizer_comp_id',
        'competition_id',
        'category_id' 
    ];

    public function organizer(){
        return $this->belongsTo(UserModel::class, 'organizer_comp_id');
    }

    public function competition(){
        return $this->belongsTo(CompetitionModel::class, 'competition_id');
    }

    public function category(){
        return $this->belongsTo(CategoryModel::class, 'category_id');
    }
}   

