import getQueryClient from "@/utils/getQueryClient";
import { Hydrate, dehydrate } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { FaTrash } from "react-icons/fa";
import Todo from "./Todo";

const getTodos = async () => {
  const res = await fetch("http://127.0.0.1:8000/api/todo");
  if (!res.ok) {
    throw new Error("Failed to get todos");
  }

  return res.json();
};

export default async function ListTodo() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["todos"], getTodos);
  const dehydratedState = dehydrate(queryClient);
  return (
    <>
      <Hydrate state={dehydratedState}>
        <Todo />
      </Hydrate>
    </>
  );
}
