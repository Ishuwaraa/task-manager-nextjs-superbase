"use client"

import { deleteTodo } from "@/utils/actions/todos/actions"

export default function DeleteTodoButton({ id }: { id: number }) {
    return (
        <button onClick={async () => {
            await deleteTodo(id);
        }}>
            Delete
        </button>
    )
}