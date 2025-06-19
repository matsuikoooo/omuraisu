"use client";

import { useState } from "react";

interface TodoInputProps {
  onAddTodo: (text: string) => void;
}

export default function TodoInput({ onAddTodo }: TodoInputProps) {
  const [inputText, setInputText] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  const handleAddTodo = () => {
    onAddTodo(inputText);
    setInputText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isComposing) {
      handleAddTodo();
    }
  };

  // TSXを返す（コンポーネントの見た目を定義）
  // TSX: TypeScriptの中でHTML風の記述ができる構文
  return (
    <div className="p-4 border-b border-gray-100">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex-shrink-0"></div>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          placeholder="新しいリマインダー"
          className="flex-1 text-base text-black bg-transparent outline-none placeholder-gray-500 font-medium"
        />

        {/* 追加ボタン */}
        <button
          onClick={handleAddTodo} // クリックされたら関数を実行
          disabled={!inputText.trim()}
          className={`text-red-500 font-medium text-sm px-2 py-1 rounded ${
            inputText.trim()
              ? "opacity-100 cursor-pointer"
              : "opacity-0 cursor-default pointer-events-none"
          }`}
        >
          追加
        </button>
      </div>
    </div>
  );
}

/**
 * TodoInput.tsx - タスク入力コンポーネント
 *
 * このコンポーネントの役割：
 * - ユーザーから新しいTODOの入力を受け取る
 * - 入力内容を親コンポーネントに伝える
 * - 入力フィールドをクリアする
 *
 * Reactコンポーネントの基本概念：
 * - props: 親コンポーネントから受け取るデータ
 * - state: コンポーネント内部で管理する状態
 * - イベント処理: ユーザーの操作に反応する処理
 */

/**
 * TODOの入力コンポーネント
 * @param onAddTodo - 新しいTODOを追加する時に呼び出される関数（親コンポーネントから渡される）
 */