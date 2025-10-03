<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class CategoryModel extends Model{
    
    use Notifiable;

    protected $table = 'categories';
    protected $primaryKey = 'id';
    public $timestams = true;

    protected  $fillable = [
        'category_name',
        'category_genre'
    ];

    public function competitionCategoryRelation(){
        return $this->hasMany(CompetitionCategoryModel::class, 'category_id', 'id');
    }
}
