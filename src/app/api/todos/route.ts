import { supabase } from "@/lib/supabase";
import { NextRequest } from "next/server";
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
// POST: 新しいTodoを作成
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text } = body;

    if (!text || text.trim() === "") {
      return Response.json({ error: "Text is required" }, { status: 400 });
    }

    const { data: todo, error } = await supabase
      .from("tasks")
      .insert({ title: text.trim() })
      .select()
      .single();

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    // データベースの形式を既存のTodo型に変換
    const formattedTodo = {
      id: todo.id,
      text: todo.title,
      completed: todo.completed,
    };

    return Response.json({ todo: formattedTodo }, { status: 201 });
  } catch {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
