<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class BenchMovementsModel extends Model{
    use Notifiable;
    
    protected $table = 'benchmark_movements';
    protected $primaryKey = 'id';
    public $timestamps= true;

    protected $fillable = [
        'front_squat',
        'overhead_squat',
        'shoulder_press',
        'push_press',
        'push_jerk',
        'deadlift',
        'sumo_high_pull',
        'power_clean',
        'power_snatch',
        'clean_and_jerk',
        'snatch',
        'benchmark_user_id'
    ];

    public function user(){
        return $this->belongsTo(UserModel::class, 'benchmark_user_id');
    }
}
