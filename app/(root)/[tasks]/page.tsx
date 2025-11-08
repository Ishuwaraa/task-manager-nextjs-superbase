import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { signout } from '@/utils/actions/auth/actions';
import AddTodo from '@/app/components/todos/add-todo';
import TodoList from '@/app/components/todos/todo-list';

export default async function TaskPage() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
        redirect('/signin')
    }

    return (
        <main className="">
            <p>Hello {data.user.email}</p>
            <button onClick={signout}>logout</button>
            <AddTodo />
            <TodoList />
        </main>
    );
}
