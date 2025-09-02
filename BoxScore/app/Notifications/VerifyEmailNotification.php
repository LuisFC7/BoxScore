<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Auth\Notifications\VerifyEmail as VerifyEmailBase;

class VerifyEmailNotification extends VerifyEmailBase
{
    use Queueable;

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('¡Bienvenido a BoxScore! Verifica tu correo')
            ->greeting('¡Hola ' . $notifiable->user_name . '!')
            ->line('Gracias por registrarte en BoxScore. Por favor verifica tu correo haciendo click en el botón de abajo.')
            ->action('Verificar Correo', $this->verificationUrl($notifiable))
            ->line('Si no creaste una cuenta, ignora este correo.')
            ->salutation('¡Saludos, BoxScore Team!');
    }
}
