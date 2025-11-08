"use client";

import { signup } from '@/utils/actions/auth/actions';
import Link from "next/link";
import { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import LoginImage from "@/public/login.png";
import Image from 'next/image';

type Inputs = {
    email: string;
    password: string;
    confirmPassword: string;
}

export default function SignUpPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        watch
    } = useForm<Inputs>();

    const password = watch("password");

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            setIsSubmitting(true);
            await signup(data);
        } catch (error) {
            setError("root", {
                message: error instanceof Error ? error.message : "Signup failed"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">Sign Up</h1>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="johndoe@example.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            {...register("email", { 
                                required: "Email is required" 
                            })} 
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm mt-1 block">{errors.email.message}</span>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input 
                            id="password" 
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            {...register("password", { 
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                }
                            })}
                        />
                        {errors.password && (
                            <span className="text-red-500 text-sm mt-1 block">{errors.password.message}</span>
                        )}
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm Password
                        </label>
                        <input 
                            id="confirmPassword" 
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            {...register("confirmPassword", { 
                                required: "Please confirm your password",
                                validate: (value) => value === password || "Passwords do not match"
                            })}
                        />
                        {errors.confirmPassword && (
                            <span className="text-red-500 text-sm mt-1 block">{errors.confirmPassword.message}</span>
                        )}
                    </div>

                    {errors.root && (
                        <span className="text-red-500 text-sm block">
                            {errors.root.message}
                        </span>
                    )}

                    <button
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition font-medium"
                    >
                        {isSubmitting ? "Signing up..." : "Sign up"}
                    </button>

                    <p className="text-center text-sm text-gray-600">
                        Aleady have an account?
                        <Link href="/signin" className="ml-3 text-blue-600 underline hover:text-blue-700">
                            Sign in
                        </Link>
                    </p>
                </form>
                </div>
            </div>

            <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-blue-500 to-blue-700 items-center justify-center p-8">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-white mb-8">Task Manager</h2>
                    <Image
                        src={LoginImage}
                        alt='Task Manager'
                        className='w-sm'
                        loading='eager'
                    />
                </div>
            </div>
        </div>
    )
}