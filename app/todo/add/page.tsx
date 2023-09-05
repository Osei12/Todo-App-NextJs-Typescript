"use client";
import TodoForm from "@/components/TodoForm";
import { createTodo } from "@/services/Todo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

export default function Todo() {
  const queryClient = useQueryClient();

  const addTodoMutattion = useMutation({
    mutationFn: createTodo,
  });

  const handleAddTodo = (formData: TodoFormData) => {
    addTodoMutattion.mutate(formData);
    console.log(formData);
  };
  return (
    <div>
      <h3 className="text-xl font-medium">Add New Todo</h3>
      <TodoForm onSubmit={handleAddTodo} />
    </div>
  );
}
