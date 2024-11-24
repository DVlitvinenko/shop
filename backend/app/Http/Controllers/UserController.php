<?php

namespace App\Http\Controllers;

use App\Enums\OrderStatus;
use App\Models\Cart;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserController extends Controller
{


    public function getUser()
    {
        $user = Auth::user();
        return  response()->json(['user' => $user], 201);
    }

    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function show(User $user)
    {
        return response()->json($user);
    }

    public function store(Request $request)
    {
        $user = User::create($request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
        ]));

        return response()->json($user, 201);
    }

    public function updatePassword(Request $request)
    {
        $validated = $request->validate([
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::where('id', Auth::user()->id)->first();

        if (!Hash::check($validated['current_password'], $user->password)) {
            return response()->json(['error' => 'Текущий пароль указан неверно'], 403);
        }


        $user->update([
            'password' => Hash::make($validated['new_password']),
        ]);

        return response()->json(['success' => true, 'message' => 'Пароль успешно обновлен'], 200);
    }

    public function destroy()
    {

        $user = User::where('id', Auth::user()->id)->first();

        $randomHash = Str::random(40);
        $deactivatedEmail = 'deleted_' . $randomHash . '@deleted.deleted';
        $deactivatedPassword = Hash::make($randomHash);

        Order::whereNotIn('status', [OrderStatus::CANCELED->value, OrderStatus::DELIVERED->value, OrderStatus::REFUNDED->value, OrderStatus::RETURNED->value])
            ->update(['status' => 'Canceled']);

        Cart::where('user_id', $user->id)->delete();

        $user->update([
            'email' => $deactivatedEmail,
            'password' => $deactivatedPassword,
            'name' => 'deleted_' . $randomHash,
        ]);

        $user->tokens()->delete();
        Auth::guard('web')->logout();

        return response()->json(['message' => 'User account deactivated and data anonymized.']);
    }
}
