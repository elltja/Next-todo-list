"use client";

import React, {
  useEffect,
  useOptimistic,
  useRef,
  useState,
  startTransition,
} from "react";
import TodoItem from "./TodoItem";
import { TodoType } from "@/types/types";
import {
  addAction,
  deleteAction,
  getAction,
  toggleAction,
} from "@/lib/actions";
import Form from "next/form";

export default function TodoBox() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [optimisticTodos, setOptimisticTodos] = useOptimistic(todos);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await getAction();
        if (response?.data) {
          setTodos(response.data);
        } else {
          setTodos([]);
        }
      } catch (err) {
        console.error("Failed to fetch todos:", err);
        setTodos([]);
      }
    };

    fetchTodos();
  }, []);

  const add = async () => {
    if (!inputRef.current || inputRef.current.value === "") return;

    const inputText = inputRef.current.value.trim();

    const newTodo: TodoType = {
      text: inputText,
      id: crypto.randomUUID(),
      isComplete: false,
    };

    startTransition(() => {
      setOptimisticTodos((prev) => {
        if (prev.some((todo) => todo.text === newTodo.text)) return prev;
        return [...prev, newTodo];
      });
    });

    inputRef.current.value = "";
    try {
      await addAction(newTodo);
      setTodos((prev) => [...prev, newTodo]);
    } catch (err) {
      console.error(err);
      setOptimisticTodos((prev) =>
        prev.filter((todo) => todo.id !== newTodo.id)
      );
    }
  };

  const toggle = async (id: string, isComplete: boolean) => {
    startTransition(() => {
      setOptimisticTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, isComplete: isComplete } : todo
        )
      );
    });
    await toggleAction(id, isComplete);
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isComplete: isComplete } : todo
      )
    );
  };

  const deleteTodo = async (id: string) => {
    startTransition(() => {
      setOptimisticTodos((prev) => prev.filter((todo) => todo.id !== id));
    });
    await deleteAction(id);
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="max-w-screen-md flex-1 h-fit bg-surface rounded-md flex flex-col items-center gap-5 py-5">
      <Form action={add} className="flex gap-2 w-11/12">
        <input
          type="text"
          name="todo"
          className="py-2 px-4 rounded-md flex-1 text-black"
          placeholder="Input task here"
          ref={inputRef}
        />
        <button
          className="py-2 px-6 bg-primary text-foreground rounded-md"
          type="submit"
        >
          Add +
        </button>
      </Form>
      <div className="flex flex-col gap-2 w-11/12">
        {optimisticTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.text}
            isComplete={todo.isComplete}
            deleteFunction={deleteTodo}
            toggleFunction={toggle}
          />
        ))}
      </div>
    </div>
  );
}
