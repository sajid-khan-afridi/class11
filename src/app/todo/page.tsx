"use client";
import React, { useEffect, useState } from "react";
import { AiFillDelete, AiFillPlusCircle, AiFillSave } from "react-icons/ai";

const Page = () => {
  const [todos, setTodos] = useState<
    { id: number; text: string; completed: boolean }[]
  >([]);
  const [editText, setEditText] = useState<{
    id: number;
    text: string;
    completed: boolean;
  }>();
  const [input, setInput] = useState("");

  //fetch data from server
  const fetchData = async () => {
    const res = await fetch("/api/todo");
    const data = await res.json();
    setTodos(data);
    console.log(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  async function handleAdd() {
    //call POST method to pass id, text, completed
    const res = await fetch("/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: Date.now(), text: input, completed: false }),
    });
    setInput("");
    fetchData();
  }

  // create handleDelete which deletes record from server
  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/todo/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    fetchData();
  };

  //create handleCompleted which update record from server
  async function handleCompleted(id: number, completed: boolean) {
    const res = await fetch(`/api/todo/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, completed: !completed }),
    });
    fetchData();
  }

  function handleText(id: number) {
    //find the todo with the id
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      setEditText(todo);
      setInput(todo.text);
    }
  }

  async function handleSave() {
    //create put method which update the text of the todo
    const res = await fetch(`/api/todo/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: editText?.id, text: input }),
    });
    fetchData();
  }

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
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <AiFillSave onClick={handleSave} className="text-red-400 text-xl" />

          <button className="">
            <AiFillPlusCircle
              onClick={handleAdd}
              className="text-green-500 text-3xl "
            />
          </button>
        </div>
        {/* list of todos */}
        <ul className="max-w-[400px] mx-auto mt-5">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="grid grid-cols-[1fr,auto,auto,auto] gap-x-4"
            >
              <span onClick={() => handleText(todo.id)}>{todo.text}</span>
              <span>{todo.completed ? "Done" : "Not Done"}</span>
              <input
                type="checkbox"
                checked={todo.completed}
                className="size-5"
                onClick={() => handleCompleted(todo.id, todo.completed)}
              />
              <span>
                <AiFillDelete
                  onClick={() => handleDelete(todo.id)}
                  className="text-red-600"
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Page;
