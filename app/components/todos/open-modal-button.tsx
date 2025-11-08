"use client";

import { useState } from "react";
import AddTodo from "./add-todo";

export default function OpenModalButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
        <button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium cursor-pointer"
        >
            Add Task
        </button>
        <AddTodo isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    )
}