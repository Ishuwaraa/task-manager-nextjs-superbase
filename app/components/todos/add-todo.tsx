"use client";

import { addTodo } from "@/utils/actions/todos/actions";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    task: string
}

const AddTodo = () => {
    const [isSubmtting, setIsSubmitting] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setIsSubmitting(true);
        await addTodo(data.task);
        setIsSubmitting(false);
        reset();
    };
    
    return ( 
        <div className=" mt-5">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type='text' placeholder='Add new task' {...register("task", { required: true })} />
                {errors.task && <span>Task is required</span>}<br />

                <button type='submit' disabled={isSubmtting}>{isSubmtting ? "Submitting" : "Add new task" }</button>
            </form>
        </div>
     );
}
 
export default AddTodo;