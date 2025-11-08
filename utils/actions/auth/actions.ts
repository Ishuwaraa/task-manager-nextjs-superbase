'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

type AuthInput = {
    email: string
    password: string
}

export async function login(data: AuthInput) {
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signup(data: AuthInput) {
    const supabase = await createClient()

    const { error } = await supabase.auth.signUp(data)

    // this throws errors if password is not 6 characters long too
    // need to catch them and show proper error messages to client
    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/', 'layout')
    redirect('/signin')
}

export async function signout() {
    const supabase = await createClient()

    await supabase.auth.signOut({ scope: 'local' })

    // redirect('/signin')
}