<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use App\Notifications\VerifyEmailNotification;
use App\Notifications\CustomResetPassword;

class UserModel extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable;

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
        'user_phone_emergency_contact',
        'user_gender',
        'user_age',
        'user_height',
        'user_weight',
        'user_box_name'
    ];

    public $timestamps = true;

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // Laravel usará esto para verificar correos
    public function getEmailForVerification(){
        return $this->user_email;
    }

    // Laravel usará esto para autenticación
    public function getAuthPassword(){
        return $this->user_password;
    }

    // Opcional: alias "email"
    public function getEmailAttribute(){
        return $this->user_email;
    }

    public function sendEmailVerificationNotification()
    {
        $this->notify(new VerifyEmailNotification());
    }

    public function sendPasswordResetNotification($token)    {
        $this->notify(new CustomResetPassword($token));
    }

    public function benchmarkMovements() {
        return $this->hasMany(BenchMovementsModel::class, 'benchmark_user_id', 'id');
    }


    // Ocultar contraseña en arrays/JSON
    protected $hidden = [
        'user_password',
        'remember_token',
    ];
}
