import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { signout } from '@/utils/actions/auth/actions';
import AddTodo from './components/todos/add-todo';
import TodoList from './components/todos/todo-list';

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/signin')
  }

  return (
    <div className="">
      <main className="">
        <p>Hello {data.user.email}</p>
        <button onClick={signout}>logout</button>
        <AddTodo />
        <TodoList />
      </main>
    </div>
  );
}
