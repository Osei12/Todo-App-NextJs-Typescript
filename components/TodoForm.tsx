"use client";

import React, { useState } from "react";

export default function TodoForm({ onSubmit, InitialValue }: TodoFormProps) {
  const INITIAL_STATE: TodoFormData = {
    title: InitialValue?.title || "",
    desc: InitialValue?.desc || "",
  };

  const [formData, setFormData] = useState<TodoFormData>(INITIAL_STATE);

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(INITIAL_STATE);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 mt-6 mb-4">
          <label className="text-sm text-gray-500">Title</label>
          <input
            value={formData.title}
            type="text"
            name="title"
            placeholder="Enter todo title"
            onChange={handleChangeInput}
            className="w-full px-4 py-5 rounded-xl placeholder:text-gray-300 placeholder:text-sm"
          />
        </div>
        <div className="flex flex-col gap-4 mt-6 mb-4">
          <label className="text-sm text-gray-500">Description</label>

          <textarea
            value={formData.desc}
            placeholder="Enter todo title"
            className="w-full px-4 py-5 rounded-xl placeholder:text-gray-300 placeholder:text-sm"
            name="desc"
            onChange={handleChangeInput}
          ></textarea>
        </div>
        <div className="flex flex-col gap-4 mt-6 mb-4">
          <button
            type="submit"
            className="w-full btn text-white hover:bg-purple-400 bg-purple-500"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
