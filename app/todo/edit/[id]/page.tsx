"use client";
import TodoForm from "@/components/TodoForm";
import { getTodo, updateTodo } from "@/services/Todo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import React from "react";

interface Params {
  params: {
    id: number;
  };
}

export default function EditTodo({ params }: Params) {
  const { id } = params;
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    isLoading,
    isError,
    error,
    data: todo,
  } = useQuery<PostData>({
    queryKey: ["todos", id],
    queryFn: () => getTodo(id),
  });

  const todoUpdateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      router.push("/");
    },
  });
  const handleUpdate = (updatedTodo: TodoFormData) => {
    todoUpdateMutation.mutate({
      id,
      ...updatedTodo,
    });
  };

  if (isLoading) {
    return "Loading ...";
  }
  return (
    <>
      <h3 className="text-xl font-medium">Edit Todo</h3>
      <TodoForm InitialValue={todo} onSubmit={handleUpdate} />
    </>
  );
}
