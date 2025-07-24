import { supabase } from "@/lib/supabase";
import { NextRequest } from "next/server";

// PUT: Todoを更新
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { text, completed } = body;
    const { id: paramId } = await params;
    const id = parseInt(paramId);

    if (isNaN(id)) {
      return Response.json({ error: "Invalid ID" }, { status: 400 });
    }

    const updateData: { title?: string; completed?: boolean; updated_at: string } = {
      updated_at: new Date().toISOString(),
    };
    if (text !== undefined) updateData.title = text;
    if (completed !== undefined) updateData.completed = completed;

    const { data: todo, error } = await supabase
      .from("tasks")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    if (!todo) {
      return Response.json({ error: "Todo not found" }, { status: 404 });
    }

    // データベースの形式を既存のTodo型に変換
    const formattedTodo = {
      id: todo.id,
      text: todo.title,
      completed: todo.completed,
    };

    return Response.json({ todo: formattedTodo });
  } catch {
    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE: Todoを削除
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: paramId } = await params;
    const id = parseInt(paramId);

    if (isNaN(id)) {
      return Response.json({ error: "Invalid ID" }, { status: 400 });
    }

    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ message: "Todo deleted successfully" });
  } catch {
    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
