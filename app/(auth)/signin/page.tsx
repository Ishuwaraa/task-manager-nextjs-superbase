"use client";

import { login } from '@/utils/actions/auth/actions';
import Link from "next/link";
import { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    email: string;
    password: string;
}

export default function SignInPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            setIsSubmitting(true);
            await login(data);
        } catch (error) {
            setError("root", {
                message: error instanceof Error ? error.message : "Signin failed"
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

            {errors.root && <span>{errors.root.message}</span>}<br />

            <button disabled={isSubmitting}>
                {isSubmitting ? "Signing in..." : "Sign in"}
            </button><br />
            <Link className="text-sm underline" href="/signup">
                Dont't have an account? Register Here
            </Link>
        </form>
    )
}