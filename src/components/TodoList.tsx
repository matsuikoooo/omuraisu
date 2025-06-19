import { Todo } from "@/types/todo";
import { CheckIcon, TrashIcon } from "./Icons";

interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
}

export default function TodoList({
  todos,
  onToggleTodo,
  onDeleteTodo,
}: TodoListProps) {
  /**
   * 個別のTODOアイテムを表示する内部コンポーネント
   * @param todo - 表示するTODOアイテムのデータ
   */
  const TodoItem = ({ todo }: { todo: Todo }) => (
    <div className="px-4 py-3 flex items-center gap-3 hover:bg-gray-50 active:bg-gray-100 transition-colors">
      <button
        onClick={() => onToggleTodo(todo.id)}
        className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
          todo.completed
            ? "bg-blue-500 border-blue-500"
            : "border-gray-300 hover:border-gray-400"
        }`}
      >
        {todo.completed && <CheckIcon />}
      </button>

      <span
        className={`flex-1 text-base leading-relaxed ${
          todo.completed ? "line-through text-gray-400" : "text-black"
        }`}
      >
        {todo.text}
      </span>

      <button
        onClick={() => onDeleteTodo(todo.id)}
        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
      >
        <TrashIcon />
      </button>
    </div>
  );

  // TODOが一つもない場合の表示
  if (todos.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="text-gray-400 text-base">リマインダーがありません</div>
      </div>
    );
  }

  // TODOがある場合の表示
  return (
    <div className="divide-y divide-gray-100">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

/**
 * TodoList.tsx - TODOリスト表示コンポーネント
 *
 * このコンポーネントの役割：
 * - TODOの配列を受け取って、それらを一覧表示する
 * - 各TODOアイテムの表示と操作を管理する
 * - TODOがない場合の表示を管理する
 *
 * このファイルで学べる概念：
 * - 配列のマップ処理（map関数）
 * - 条件付きレンダリング（三項演算子）
 * - コンポーネントの内部分割（内部関数コンポーネント）
 */

/**
 * TODOリスト表示コンポーネント
 * @param todos - 表示するTODOの配列
 * @param onToggleTodo - 完了状態を切り替える時に呼び出される関数
 * @param onDeleteTodo - 削除する時に呼び出される関数
 */