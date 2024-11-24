<?php

namespace App\Http\Controllers;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Env;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Hash;
use App\Services\TokenService;

class AuthorizationController extends Controller
{
    protected $tokenService;

    public function __construct(TokenService $tokenService)
    {
        $this->tokenService = $tokenService;
    }


    /**
     * Регистрация пользователя и создание токена
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $data['role'] = UserRole::USER->value;

        $user = User::create($data);

        Auth::login($user);

        $token = $this->tokenService->createUserToken($user);

        return response()->json(['user' => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
        ], 'token' => $token], 200);
    }

    /**
     * Логин пользователя и создание токена
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'name' => ['required', 'string'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            $token = $this->tokenService->createUserToken($user);

            return response()->json([
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ],
                'token' => $token,
            ], 200);
        }

        return response()->json(['error' => 'The provided credentials do not match our records.'], 401);
    }



    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        Auth::guard('web')->logout();

        return response()->json(['message' => 'Logged out'], 200);
    }
}
