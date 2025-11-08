import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import TodoList from '@/app/components/todos/todo-list';
import { Suspense } from 'react';
import OpenModalButton from '@/app/components/todos/open-modal-button';

export default async function TaskPage() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
        redirect('/signin')
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-blue-100 p-8">
            <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>
                        <OpenModalButton />
                    </div>
                    
                    <Suspense fallback={
                        <div className="text-center py-8 text-gray-500">
                            Loading tasks...
                        </div>
                    }>
                        <TodoList />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
