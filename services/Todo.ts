export async function getTodos() {
  const res = await fetch("http://127.0.0.1:8000/api/todo");
  if (!res.ok) {
    throw new Error("Failed to get todos");
  }
  return res.json();
}
export async function getTodo(id: number) {
  const res = await fetch(`http://127.0.0.1:8000/api/todo/${id}`);
  if (!res.ok) {
    throw new Error("Failed to get todos");
  }
  return res.json();
}

export const updateTodoPartial = async ({
  id,
  isCompleted,
}: partialUpdateType) => {
  const response = await fetch(
    `http://127.0.0.1:8000/api/todo/partial-update/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ is_completed: isCompleted }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update todo");
  }

  return response.json();
};

export const createTodo = async (newTodo: TodoFormData) => {
  const response = await fetch(`http://127.0.0.1:8000/api/todo/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  });

  if (!response.ok) {
    throw new Error("Failed to create todo");
  }
  return response.json();
};

export const updateTodo = async (updatedTodo: PostData) => {
  const response = await fetch(
    `http://127.0.0.1:8000/api/todo/update/${updatedTodo.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update todo");
  }

  return response.json();
};

export const deleteTodo = async (id: number) => {
  const response = await fetch(`http://127.0.0.1:8000/api/todo/delete/${id}`, {
    method: "DELETE",
  });

  return true;
};
