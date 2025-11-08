"use client";

import { addTodo } from "@/utils/actions/todos/actions";
import { useRef } from "react";

const AddTodo = () => {
    const ref = useRef<HTMLFormElement>(null);
    
    return ( 
        <div className=" mt-5">
            <form action={async (formData) => {
                console.log(formData);
                await addTodo(formData);
                ref.current?.reset();
            }}>
                <input name="task" type='text' placeholder='Add new task' required /><br />
                <button type='submit'>Add Task</button>
            </form>
        </div>
     );
}
 
export default AddTodo;