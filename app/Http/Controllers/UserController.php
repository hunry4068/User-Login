<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function registerUser(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required',
                'email' => 'required|email',
                'password' => 'required'
            ]
        );

        if ($validator->fails()) {
            return response()->json(
                [
                    'success' => false,
                    'message' => 'validation_error',
                    'errors' => $validator->errors()
                ]
            );
        }

        $name = explode(' ', $request->name);
        $first_name = $name[0];
        $last_name = isset($name[1]) ? $name[1] : '';
        $newUserData = array(
            'first_name' => $first_name,
            'last_name' => $last_name,
            'full_name' => $request->name,
            'email' => $request->email,
            'password' => md5($request->password),
            'phone' => $request->phone
        );

        $isNewUserFlag = is_null(User::where('email', $request->email)->first());
        $createdUserData = $isNewUserFlag ? User::create($newUserData) : null;

        if (!is_null($createdUserData)) {
            return response()->json(
                [
                    'success' => true,
                    'message' => 'Registration completed successfully.',
                    'data' => $createdUserData
                ]
            );
        } elseif (!$isNewUserFlag) {
            return response()->json(
                [
                    'success' => false,
                    'message' => 'Whoops! The email has been registered.'
                ]
            );
        } else {
            return response()->json(
                [
                    'success' => false,
                    'message' => 'Failed to register. Please contact us.'
                ]
            );
        }
    }

    public function loginUser(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'email' => 'required|email',
                'password' => 'required'
            ]
        );

        if ($validator->fails()) {
            return response()->json(
                [
                    'success' => false,
                    'message' => 'validation_error',
                    'errors' => $validator->errors()
                ]
            );
        }

        $userByEmail = User::where('email', $request->email)->first();
        $hasEmailFlag = !is_null($userByEmail);
        $checkPasswordFlag = $hasEmailFlag && $userByEmail->password == md5($request->password);

        if ($hasEmailFlag && $checkPasswordFlag) {
            return response()->json(
                [
                    'success' => true,
                    'message' => 'You have logged in successfully.',
                    'data' => $userByEmail
                ]
            );
        } elseif (!$hasEmailFlag) {
            return response()->json(
                [
                    'success' => false,
                    'message' => 'Unable to login. Email doesn\'t exist.'
                ]
            );
        } elseif (!$checkPasswordFlag) {
            return response()->json(
                [
                    'success' => false,
                    'message' => 'Unable to login. Incorrect password.'
                ]
            );
        } else {
            return response()->json(
                [
                    'success' => false,
                    'message' => 'Fail to login. Please contact us.'
                ]
            );
        }
    }

    public function readUserInfo($email)
    {
        $user = $email != '' ? User::where('email', $email)->first() : array();
        return $user;
    }

    public function test()
    {
        return response()->json('test for api. in user controller');
    }
}
