"use client";
import { deleteTodo, getTodos, updateTodoPartial } from "@/services/Todo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { data } from "autoprefixer";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function Todo() {
  const {
    data: todos,
    isError,
    error,
    isLoading,
  } = useQuery<PostType[]>({
    queryFn: getTodos,
    queryKey: ["todos"],
  });

  const queryClient = useQueryClient();

  const partialUpateMutation = useMutation({
    mutationFn: updateTodoPartial,
    // After a successful mutation, invalidate the todos query to refetch data
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // Handle the checkbox change event
  const handleCheckBox = (id: number, isChecked: boolean) => {
    // Call the mutation function to update the todo item
    partialUpateMutation.mutate({ id, isCompleted: isChecked });
  };

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const handleDelete = (id: number) => {
    deleteTodoMutation.mutate(id);
  };

  const router = useRouter();

  if (isLoading) return "Loading ...";
  if (isError) return (error as Error).message;
  return (
    <>
      {todos?.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center cursor-pointer gap-2 mt-6 mb-4"
        >
          <input
            type="checkbox"
            checked={todo.is_completed}
            className="checkbox"
            onChange={(e) => handleCheckBox(todo.id, e.target.checked)}
          />

          <div
            className={`${
              todo.is_completed ? "bg-gray-400" : ""
            } w-full flex bg-purple-50/70 px-3 py-6 justify-between items-center rounded-xl h-auto`}
          >
            <h4
              className={`${
                todo.is_completed ? "line-through text-gray-600" : ""
              } text-purple-500 capitalize `}
            >
              {todo.title}
            </h4>
          </div>
          <button
            onClick={() => router.push(`/todo/edit/${todo.id}`)}
            className="btn btn-secondary"
          >
            <FaEdit className="text-white" />
          </button>
          <button
            onClick={() => handleDelete(todo.id)}
            className="btn btn-error"
          >
            <FaTrash className="text-white" />
          </button>
        </div>
      ))}
    </>
  );
}
