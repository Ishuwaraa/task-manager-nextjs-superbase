"use client"

import { deleteTodo } from "@/utils/actions/todos/actions"
import { useState } from "react";
import DeleteIcon from "@/public/bin.png";
import Image from "next/image";

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
            className="px-3 py-1 cursor-pointer"
            disabled={isDeleting}
        >
            <Image
                src={DeleteIcon}
                alt="delete"
                className={`w-5 ${isDeleting && 'opacity-10'}`}
            />
        </button>
    )
}