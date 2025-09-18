<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class CompetitionModel extends Model{
    
    use Notifiable;

    protected $table = 'competitions';
    protected $primaryKey = 'id';

    protected $fillable = [
        'competition_name',
        'competition_date',
        'competition_place',
        'competition_box_name',
        'competition_img',
        'competition_organizer_id',
        'competition_description',
        'competition_status',
        'competition_max_participants',
        'competition_type',
        'competition_fee'
    ];

    public $timestamps = true;
    
}
