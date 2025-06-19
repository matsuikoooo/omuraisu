"use client";

import { useState } from "react";
import { Todo } from "@/types/todo";
import TodoInput from "@/components/TodoInput";
import TodoList from "@/components/TodoList";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

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

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-black text-center">
            リマインダー
          </h1>
        </div>
      </div>

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
 *    - 状態が変更されると自動的にUIが再レンダリングされる
 *    - Todo型の配列として管理
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