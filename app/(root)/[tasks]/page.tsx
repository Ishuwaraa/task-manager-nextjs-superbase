import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import AddTodo from '@/app/components/todos/add-todo';
import TodoList from '@/app/components/todos/todo-list';
import { Suspense } from 'react';

export default async function TaskPage() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
        redirect('/signin')
    }

    return (
        <main className="">
            <AddTodo />
            <Suspense fallback={<div>Loading tasks...</div>}>
                <TodoList />
            </Suspense>
        </main>
    );
}
