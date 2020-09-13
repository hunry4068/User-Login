<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

    private $status_code = 200;

    public function userSignUp(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required',
                'email' => 'required|email',
                'password' => 'required',
                'phone' => 'required'
            ]
        );

        if ($validator->fails()) {
            return response()->json(
                [
                    'status' => 'failed',
                    'success' => false,
                    'message' => 'validation_error',
                    'errors' => $validator->errors()
                ]
            );
        }

        $name = explode(' ', $request->name);
        $first_name = $name[0];
        $last_name = isset($name[1]) ? $name[1] : '';

        $userDataArray = array(
            'first_name' => $first_name,
            'last_name' => $last_name,
            'full_name' => $request->name,
            'email' => $request->email,
            'password' => md5($request->password),
            'phone' => $request->phone
        );

        $user_status = User::where('email', $request->email)->first();

        if (!is_null($user_status)) {
            return response()->json(
                [
                    'status' => 'failed',
                    'success' => false,
                    'message' => 'Whoops! email already registered'
                ]
            );
        }

        $user = User::create($userDataArray);

        if (!is_null($user)) {
            return response()->json(
                [
                    'status' => $this->status_code,
                    'success' => true,
                    'message' => 'Registration completed successfully',
                    'data' => $user
                ]
            );
        } else {
            return response()->json(
                [
                    'status' => 'failed',
                    'success' => false,
                    'message' => 'Failed to register'
                ]
            );
        }
    }

    // ------------ [ User Login ] -------------------
    public function userLogin(Request $request)
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
                    'status' => 'failed',
                    'validation_error' => $validator->errors()
                ]
            );
        }

        // check if entered email exists in db
        $email_status = User::where('email', $request->email)->first();

        // if email exists then we will check password for the same email
        if (!is_null($email_status)) {
            $password_status = User::where('email', $request->email)->where('password', md5($request->password))->first();

            // if password is correct
            if (!is_null($password_status)) {
                $user = $this->userDetail($request->email);

                return response()->json(
                    [
                        'status' => $this->status_code,
                        'success' => true,
                        'message' => 'You have logged in successfully',
                        'data' => $user
                    ]
                );
            } else {
                return response()->json(
                    [
                        'status' => 'failed',
                        'success' => false,
                        'message' => 'Unable to login. Incorrect password.'
                    ]
                );
            }
        } else {
            return response()->json(
                [
                    'status' => 'failed',
                    'success' => false,
                    'message' => 'Unable to login. Email doesn\'t exist.'
                ]
            );
        }
    }

    // ------------------ [ User Detail ] ---------------------
    public function userDetail($email)
    {
        $user = array();
        if ($email != '') {
            $user = User::where('email', $email)->first();
            return $user;
        }
    }

    public function test()
    {
        return response()->json('test for api. in user controller');
    }
}