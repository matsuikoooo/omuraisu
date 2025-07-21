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

/**
 * リマインダーアプリのメインページコンポーネント：
 *
 * 1. 状態管理（useState）
 *    - todos: TODOリストの全てのアイテムを保存
 *    - loading: データ取得中の状態を管理
 *    - error: エラー発生時のメッセージを保存
 *    - 状態が変更されると自動的にUIが再レンダリングされる
 *
 * 2. CRUD操作（Create, Read, Update, Delete）
 *    - addTodo: 新しいタスクを追加（Create）
 *    - todos配列: タスクの表示（Read）
 *    - toggleTodo: 完了状態の切り替え（Update）
 *    - deleteTodo: タスクの削除（Delete）
 *
 * 3. 関数型プログラミングの活用
 *    - map(): 配列の各要素を変換（toggleTodo内で使用）
 *    - filter(): 条件に合う要素のみ抽出（deleteTodo内で使用）
 *    - スプレッド演算子(...): 既存配列に新要素追加
 *
 * 4. コンポーネント設計
 *    - TodoInput: 新規タスク入力フォーム
 *    - TodoList: タスクリストの表示と操作
 *    - 各コンポーネントが明確な役割を持つ
 *
 * 5. プロップス（Props）による連携
 *    - 親（このコンポーネント）が状態とロジックを管理
 *    - 子コンポーネントにはデータと関数を渡す
 *    - 一方向データフロー（親→子）でデータが流れる
 *
 * 6. TailwindCSSによるスタイリング
 *    - レスポンシブデザイン（max-w-md mx-auto）
 *    - シンプルで美しいUI
 *    - モバイルファーストアプローチ
 */