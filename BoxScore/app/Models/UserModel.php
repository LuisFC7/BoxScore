<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserModel extends Model{
    use HasFactory;

    protected $table = 'users';
    protected $primaryKey = 'id';

    protected $fillable = [
        'user_name',
        'user_email',
        'user_password',
        'user_img',
        'user_tag',
        'user_phone',
        'user_birthday',
        'user_country',
        'user_state',
        'user_city',
        'user_phone_emergency_contact'
    ];

    public $timestamps= true;

}
