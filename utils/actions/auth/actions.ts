'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

type AuthInput = {
    email: string
    password: string
}

export async function login(authInput: AuthInput) {
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword(authInput)

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/', 'layout')
    redirect('/tasks')
}

export async function signup(authInput: AuthInput) {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signUp(authInput)
    console.log('signup data', data);
    console.log('signup error', error);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/', 'layout')
    redirect('/signin?msg=check-email')
}

export async function signout() {
    const supabase = await createClient()

    await supabase.auth.signOut({ scope: 'local' })

    // redirect('/signin')
}