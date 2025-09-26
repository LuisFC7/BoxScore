<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class WodModel extends Model{
    
    use Notifiable;

    protected $table = 'wod_user';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'wod_name',
        'wod_protocol',
        'wod_description',
        'wod_score',
        'wod_time',
        'wod_date',
        'wod_user_id'
    ];

    public function userWodRelation(){
        return $this->belongsTo(UserModel::class, 'wod_user_id');
    }
}
