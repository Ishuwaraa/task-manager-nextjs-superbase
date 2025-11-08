"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { Todo, CreateTodoInput } from "@/utils/types/todo.types";

async function getAuthenticatedUser() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
        throw new Error("Not authenticated");
    }
    
    return { user, supabase };
}

export async function addTodo(task: string) {
    const { user, supabase } = await getAuthenticatedUser();

    const newTodo: CreateTodoInput = {
        user_id: user.id,
        task
    }

    const { error } = await supabase
        .from("todos")
        .insert(newTodo)

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/");
}

export async function getTodos(): Promise<Todo[]> {
    const { user, supabase } = await getAuthenticatedUser();

    const { data, error } = await supabase
        .from("todos")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    return data as Todo[];
}

export async function toggleTodoComplete(id: number, isComplete: boolean) {
    const { user, supabase } = await getAuthenticatedUser();

    const { error } = await supabase
        .from("todos")
        .update({ is_complete: isComplete })
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/");
}

export async function deleteTodo(id: number) {
    const { user, supabase } = await getAuthenticatedUser();

    const { error } = await supabase
        .from("todos")
        .delete()
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/");
}