"use client";

import { signup } from '@/utils/actions/auth/actions';
import Link from "next/link";
import { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";

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
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">Email:</label>
            <input 
                type='email'
                placeholder='johndoe@example.com'
                {...register("email", { 
                    required: "Email is required" 
                })} 
            />
            {errors.email && <span>{errors.email.message}</span>}<br />

            <label htmlFor="password">Password:</label>
            <input 
                id="password" 
                type="password" 
                {...register("password", { 
                    required: "Password is required",
                    minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                    }
                })}
            />
            {errors.password && <span>{errors.password.message}</span>}<br />

            <label htmlFor="confirmPassword">Confirm password:</label>
            <input 
                id="confirmPassword" 
                type="password" 
                {...register("confirmPassword", { 
                    required: "Please confirm your password",
                    validate: (value) => value === password || "Passwords do not match"
                })}
            />
            {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}<br />

            {errors.root && <span>{errors.root.message}</span>}<br />

            <button disabled={isSubmitting}>
                {isSubmitting ? "Signing up..." : "Sign up"}
            </button><br />
            <Link className="text-sm underline" href="/signin">
                Already have an account? Sign In
            </Link>
        </form>
    )
}