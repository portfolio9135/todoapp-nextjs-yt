"use client";

import { addTodo } from "@/api";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const AddTask = () => {
  const [taskTitle, setTaskTitle] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await addTodo({ id: uuidv4(), text: taskTitle });

    setTaskTitle("");
  };

  return (
    <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
      <input
        type="text"
        className="border w-full px-4 py-2 rounded-lg focus:outline-none focus:border-blue-400"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTaskTitle(e.target.value)
        }
        value={taskTitle}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-400 hover:scale-95 duration-300">
        Add Task
      </button>
    </form>
  );
};

export default AddTask;
