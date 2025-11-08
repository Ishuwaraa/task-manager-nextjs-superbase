'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

type AuthInput = {
    email: string
    password: string
}

type ActionResult = {
    success: boolean,
    status?: number,
    error?: string
}

export async function login(authInput: AuthInput): Promise<ActionResult> {
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword(authInput)

    if (error) {
        console.log(error);
        //throw new Error(error.message);
        return { success: false, status: error.status, error: error.message}
    }

    revalidatePath('/', 'layout')
    redirect('/tasks')
}

export async function signup(authInput: AuthInput): Promise<ActionResult> {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signUp(authInput)
    // console.log('signup data', data);
    // console.log('signup error', error);

    if (error) {
        //throw new Error(error.message);
        return { success: false, status: error.status, error: error.message}
    }

    revalidatePath('/', 'layout')
    redirect('/signin?msg=check-email')
}

export async function signout() {
    const supabase = await createClient()

    await supabase.auth.signOut({ scope: 'local' })

    redirect('/signin')
}