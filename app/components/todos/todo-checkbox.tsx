"use client"

import { toggleTodoComplete } from "@/utils/actions/todos/actions";

export default function TodoCheckbox({ id, isComplete }: { id: number, isComplete: boolean }) {
    return ( 
        <input
            type="checkbox"
            checked={isComplete}
            onChange={async (e) => {
                await toggleTodoComplete(id, e.target.checked)
            }}
        />
     );
}