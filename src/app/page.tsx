"use client";

import { useState, useEffect } from "react";
import { Todo } from "@/types/todo";
import { fetchTodos } from "@/lib/api";
import TodoInput from "@/components/TodoInput";
import TodoList from "@/components/TodoList";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Todoの読み込み
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const fetchedTodos = await fetchTodos();
      setTodos(fetchedTodos);
    } catch (err) {
      setError("リマインダーの読み込みに失敗しました");
      console.error("Failed to load todos:", err);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = (text: string) => {
    if (text.trim() === "") return;

    setTodos((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: text.trim(),
        completed: false,
      },
    ]);
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-black text-center">
            リマインダー
          </h1>
        </div>
      </div>

      {error && (
        <div className="max-w-md mx-auto mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
          <button
            onClick={() => setError(null)}
            className="ml-2 text-red-500 hover:text-red-700"
          >
            ×
          </button>
        </div>
      )}

      <div className="max-w-md mx-auto bg-white mt-8 rounded-xl shadow-sm overflow-hidden">
        <TodoInput onAddTodo={addTodo} />
        <TodoList
          todos={todos}
          onToggleTodo={toggleTodo}
          onDeleteTodo={deleteTodo}
        />
      </div>

      <div className="h-20"></div>
    </div>
  );
}
