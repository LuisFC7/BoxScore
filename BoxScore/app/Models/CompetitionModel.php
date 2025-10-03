<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class CompetitionModel extends Model{
    
    use Notifiable;

    protected $table = 'competitions';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'competition_name',
        'competition_place',
        'competition_box_name',
        'competition_img',
        'competition_organizer_id',
        'competition_description',
        'competition_status',
        'competition_max_participants',
        'competition_type',
        'competition_fee',
        'competition_start_date',
        'competition_finish_date'
    ];

    public function competitionRelation(){
        return $this->belongsTo(UserModel::class, 'competition_organizer_id');
    }

    public function competitionCategoryRelation(){
        return $this->hasMany(CompetitionCategoryModel::class, 'competition_id', 'id');
    }

    
}
