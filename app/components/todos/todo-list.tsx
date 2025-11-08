import { getTodos } from "@/utils/actions/todos/actions";
import DeleteTodoButton from "./delete-todo";
import TodoCheckbox from "./todo-checkbox";

export default async function TodoList() {
    const todos = await getTodos();

    if (!todos || todos.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                <p className="text-lg">No tasks yet. Add your first task to get started!</p>
            </div>
        );
    }

    const activeTodos = todos.filter((todo) => !todo.is_complete);
    const completedTodos = todos.filter((todo) => todo.is_complete);

    return (
        <div className="space-y-8">
            {activeTodos.length > 0 && (
                <div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Active Tasks</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b-2 border-gray-200">
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 w-12">Done</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Task</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 w-40">Created</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 w-24">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activeTodos.map((todo) => (
                                    <tr key={todo.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                        <td className="py-4 px-4">
                                            <TodoCheckbox id={todo.id} isComplete={todo.is_complete} />
                                        </td>
                                        <td className="py-4 px-4 text-gray-800">{todo.task}</td>
                                        <td className="py-4 px-4 text-sm text-gray-500">
                                            {new Date(todo.created_at).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </td>
                                        <td className="py-4 px-4">
                                            <DeleteTodoButton id={todo.id} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {completedTodos.length > 0 && (
                <div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Completed Tasks</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b-2 border-gray-200">
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 w-12">Done</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Task</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 w-40">Created</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 w-24">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {completedTodos.map((todo) => (
                                    <tr key={todo.id} className="border-b border-gray-100 hover:bg-gray-50 transition opacity-60">
                                        <td className="py-4 px-4">
                                            <TodoCheckbox id={todo.id} isComplete={todo.is_complete} />
                                        </td>
                                        <td className="py-4 px-4 text-gray-600 line-through">{todo.task}</td>
                                        <td className="py-4 px-4 text-sm text-gray-500">
                                            {new Date(todo.created_at).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </td>
                                        <td className="py-4 px-4">
                                            <DeleteTodoButton id={todo.id} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
     );
}