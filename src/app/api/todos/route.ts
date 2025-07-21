import { supabase } from "@/lib/supabase";

// GET: すべてのTodoを取得
export async function GET() {
  try {
    const { data: todos, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    // データベースの形式を既存のTodo型に変換
    const formattedTodos = todos.map((todo) => ({
      id: todo.id,
      text: todo.title,
      completed: todo.completed,
    }));

    return Response.json({ todos: formattedTodos });
  } catch {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
