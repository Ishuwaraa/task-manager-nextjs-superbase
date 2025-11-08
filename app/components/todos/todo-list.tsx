import { getTodos } from "@/utils/actions/todos/actions";
import DeleteTodoButton from "./delete-todo";
import TodoCheckbox from "./todo-checkbox";

export default async function TodoList() {
    const todos = await getTodos();

    return ( 
        <div className='mt-5'>
            <ul>
                {todos && 
                    todos
                        .filter((todo) => !todo.is_complete)
                        .map((todo) => (
                            <li key={todo.id}>
                                <TodoCheckbox id={todo.id} isComplete={todo.is_complete} />
                                <span className="mx-2">{todo.task}</span>
                                <DeleteTodoButton id={todo.id} />
                            </li>
                ))}
                
                {todos && 
                    todos
                        .filter((todo) => todo.is_complete)
                        .map((todo) => (
                            <li key={todo.id}>
                                <TodoCheckbox id={todo.id} isComplete={todo.is_complete} />
                                <span className="mx-2">{todo.task}</span>
                                <DeleteTodoButton id={todo.id} />
                            </li>
                ))}
            </ul>
        </div>
     );
}