"use client";
import React, { useState } from "react";
import { AiFillDelete, AiFillPlusCircle, AiFillSave } from "react-icons/ai";

const Page = () => {
  const [todos, setTodos] = useState<
    { id: number; text: string; completed: boolean }[]
  >([]);
  return (
    <div className=" h-screen w-full bg-gray-400 p-5">
      {/* input and button */}
      <h1 className="text-lg text-center text-white"> To Do App</h1>
      <div className="max-w-[400px] mx-auto bg-white rounded-lg p-2 shadow-lg mt-5 h-[400px]">
        <div className="flex justify-between pt-5">
          <input
            className="border border-gray-200 rounded-md py-1 px-2"
            type="text"
            placeholder="Enter todo"
          />

          <AiFillSave className="text-red-400 text-xl" />

          <button className="">
            <AiFillPlusCircle className="text-green-500 text-3xl " />
          </button>
        </div>
        {/* list of todos */}
        <ul className="max-w-[300px] mx-auto mt-5">
          {todos.map((todo) => (
            <li key={todo.id} className="grid grid-cols-4 gap-x-4">
              <span>{todo.text}</span>
              <span>{todo.completed ? "Done" : "Not Done"}</span>
              <input type="checkbox" checked={todo.completed} />
              <span>
                <AiFillDelete className="text-red-600" />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Page;
