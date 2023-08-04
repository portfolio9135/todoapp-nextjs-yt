"use client";

import { deleteTodo, editTodo } from "@/api";
import { Task } from "@/types";
import React, { useEffect, useRef, useState } from "react";

interface TodoProps {
  todo: Task;
}

const Todo = ({ todo }: TodoProps) => {
  const ref = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditng] = useState(false);
  const [editedTaskTitle, setEditedTaskTitle] = useState(todo.text);

  useEffect(() => {
    if (isEditing) {
      ref.current?.focus();
    }
  }, [isEditing]);

  const handleEdit = async () => {
    setIsEditng(true);
  };

  const handleSave = async () => {
    await editTodo(todo.id, editedTaskTitle);

    setIsEditng(false);
  };

  const handleDelete = async () => {
    await deleteTodo(todo.id);
  };

  return (
    <li
      key={todo.id}
      className="flex justify-between p-4 mt-4 bg-white border-l-4 border-blue-500 rounded shadow"
    >
      {isEditing ? (
        <input
          ref={ref}
          type="text"
          className="border border-gray-400 rounded shadow py-1 px-2"
          value={editedTaskTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEditedTaskTitle(e.target.value)
          }
        />
      ) : (
        <div>{todo.text}</div>
      )}

      <div>
        {isEditing ? (
          <button className="text-blue-500 mr-3" onClick={handleSave}>
            保存
          </button>
        ) : (
          <button className="text-green-500 mr-3" onClick={handleEdit}>
            編集
          </button>
        )}

        <button className="text-red-500" onClick={handleDelete}>削除</button>
      </div>
    </li>
  );
};

export default Todo;
