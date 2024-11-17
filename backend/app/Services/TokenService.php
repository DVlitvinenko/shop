<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class TokenService
{
    /**
     * Создать новый токен для пользователя
     *
     * @param User $user
     * @param string|null $tokenName
     * @return string
     */
    public function createUserToken(User $user, ?string $tokenName = null): string
    {
        $tokenName = $tokenName ?: config('app.name', 'DVLLab');

        $token = $user->createToken($tokenName);

        return $token->plainTextToken;
    }
}
