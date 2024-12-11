import React, { useState } from 'react';
import authService from '../../appwrite/authService';
import { login as authLogin } from '../../store/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Logo, Button, Input, LogoText, Loading } from '../index';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function Login() {
  const [isLoading, setLoader] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");

  const userlogin = async (data) => {
    
    setLoader(true);
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate('/');
      }
    } catch (err) {
      console.log(err)
      setError(err.message || 'An unexpected error occurred. Please try again.');
    }
    setLoader(false)
  };

  const googleLogin = async () =>{
    setLoader(true);
    setError("");
    try {
      const session = await authService.gmailLogin();
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate('/');
      }
    } catch (err) {
      console.log(err)
      setError(err.message || 'An unexpected error occurred. Please try again.');
    }
    setLoader(false)
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-sm mx-4 sm:mx-6 md:mx-auto">
      <Link to="/">
        <div className="mb-4 flex items-center cursor-pointer">
          <Logo className="w-5 h-5" />
          <LogoText text="text-blue-400" />
        </div>
      </Link>

      <h2 className="text-center text-2xl font-bold leading-tight mb-4 text-red-500">Login</h2>

      {/* Display Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(userlogin)}>
        <div className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            className="w-full border-b-2 border-gray-300 focus:border-primary focus:outline-none px-2 py-1"
            {...register('email', {
              required: 'Email is required',
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Email address must be a valid address',
              },
            })}
            error={errors.email?.message}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            className="w-full border-b-2 border-gray-300 focus:border-primary focus:outline-none px-2 py-1"
            {...register('password', {
              required: 'Password is required',
            })}
            error={errors.password?.message}
          />
        </div>

        <div className="mt-4">
          <Button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center justify-center space-x-2"
          >
            Login
          </Button>
        </div>
        <div className="mt-4 text-center">
          <Link to="" className="text-sm text-primary hover:underline">
            Forgot Password?
          </Link>
        </div>
      </form>

      <div className="my-4 flex items-center justify-between">
        <span className="block w-full border-t border-gray-300"></span>
        <span className="mx-2 text-sm text-gray-400">OR</span>
        <span className="block w-full border-t border-gray-300"></span>
      </div>

      <div className="mt-4">
        <Button
          onClick = {googleLogin}
          type="button"
          className="w-full py-2 bg-gradient-to-b from-gray-800 to-gray-900 text-white rounded-md hover:bg-red-600 flex items-center justify-center space-x-2"
        >
          <img src="\src\assets\image.png" alt="Google" className="w-5 h-5" />
          <span>Login with Google</span>
        </Button>
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Don&apos;t have an account?&nbsp;
          <Link to="/auth/signup" className="text-primary font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
      <Loading isLoading={isLoading} />
    </div>
  );
}

export default Login;
