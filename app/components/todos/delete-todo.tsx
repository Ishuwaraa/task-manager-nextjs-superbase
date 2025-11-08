"use client"

import { deleteTodo } from "@/utils/actions/todos/actions"
import { useState } from "react";

export default function DeleteTodoButton({ id }: { id: number }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        await deleteTodo(id);
        setIsDeleting(false);
    }
    return (
        <button 
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-1 rounded transition font-medium text-sm cursor-pointer"
            disabled={isDeleting}
        >
            { isDeleting ? 'Deleting...' : 'Delete'}
        </button>
    )
}