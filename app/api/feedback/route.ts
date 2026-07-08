import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

export async function POST(req: Request) {
  try {
    // If KV is not configured, we gracefully fail so the UI can catch it
    if (!process.env.KV_REST_API_URL) {
      console.warn("Vercel KV is not configured.");
      return NextResponse.json({ error: "Database not connected" }, { status: 500 });
    }

    const data = await req.json();
    
    if (!data.name || !data.name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (!data.email || !data.email.trim()) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!data.message || !data.message.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const feedbackEntry = {
      id: crypto.randomUUID(),
      name: data.name.trim(),
      email: data.email.trim(),
      message: data.message.trim(),
      createdAt: new Date().toISOString(),
    };

    // Store in Vercel KV list
    await kv.lpush("infinity_feedback", JSON.stringify(feedbackEntry));

    return NextResponse.json({ success: true, entry: feedbackEntry }, { status: 201 });
  } catch (error) {
    console.error("Error saving feedback:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    if (!process.env.KV_REST_API_URL) {
      return NextResponse.json({ error: "Database not connected", feedback: [] }, { status: 500 });
    }

    // Get all feedback entries
    const feedbackList = await kv.lrange("infinity_feedback", 0, -1);
    
    return NextResponse.json({ feedback: feedbackList });
  } catch (error) {
    console.error("Error retrieving feedback:", error);
    return NextResponse.json({ error: "Internal Server Error", feedback: [] }, { status: 500 });
  }
}
