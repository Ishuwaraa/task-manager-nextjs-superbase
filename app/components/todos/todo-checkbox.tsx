"use client"

import { toggleTodoComplete } from "@/utils/actions/todos/actions";

export default function TodoCheckbox({ id, isComplete }: { id: number, isComplete: boolean }) {
    return ( 
        <input
            type="checkbox"
            checked={isComplete}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
            onChange={async (e) => {
                await toggleTodoComplete(id, e.target.checked)
            }}
        />
     );
}