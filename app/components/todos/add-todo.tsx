"use client";

import { addTodo } from "@/utils/actions/todos/actions";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    task: string
}

const AddTodo = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
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
        onClose();
    };

    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Add New Task</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <textarea
                            rows={4}
                            placeholder="Enter task description"
                            {...register("task", { required: "Task is required" })} 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                        />
                        {errors.task && (
                            <span className="text-red-500 text-sm mt-1">{errors.task.message}</span>
                        )}
                    </div>

                    <div className="flex gap-3 justify-end">
                        <button 
                            type='button'
                            onClick={onClose}
                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button 
                            type='submit' 
                            disabled={isSubmitting}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50"
                        >
                            {isSubmitting ? "Adding..." : "Add Task"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default AddTodo;