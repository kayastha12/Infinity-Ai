import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import nodemailer from "nodemailer";

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

    // Strict email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
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

    // Async Email Auto-Reply via Gmail SMTP (Graceful degradation if credentials are missing)
    if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
          },
        });

        const emailHtml = `
          <div style="background-color: #030305; color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px; border-radius: 16px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(255, 255, 255, 0.08); box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #00ffff; font-size: 28px; margin: 0; letter-spacing: -0.5px; font-weight: 700; text-transform: uppercase;">INFINITY AI</h1>
              <p style="color: #888; font-size: 10px; margin: 5px 0 0 0; text-transform: uppercase; letter-spacing: 3px; font-weight: 600;">Personal Intelligence System</p>
            </div>
            
            <div style="margin-bottom: 35px;">
              <h2 style="font-size: 18px; font-weight: 500; margin-top: 0; color: #ffffff; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 10px;">Hello ${data.name.trim()},</h2>
              <p style="color: #cccccc; line-height: 1.6; font-size: 15px; font-weight: 300;">
                We have successfully received your feedback regarding <strong>Infinity AI</strong>. Thank you for contributing to the self-evolution of our platform.
              </p>
              
              <div style="background-color: rgba(255, 255, 255, 0.02); border-left: 3px solid #00ffff; padding: 18px; margin: 25px 0; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.05); border-left-width: 3px;">
                <p style="color: #888888; font-size: 11px; text-transform: uppercase; margin: 0 0 8px 0; font-weight: bold; letter-spacing: 1px;">Your Submission</p>
                <p style="color: #e5e5e5; font-style: italic; margin: 0; font-size: 14px; line-height: 1.5; font-weight: 300;">"${data.message.trim()}"</p>
              </div>
              
              <p style="color: #cccccc; line-height: 1.6; font-size: 15px; font-weight: 300;">
                Our core systems and developers are actively reviewing your submission. If we require any additional logs or context, our team will contact you directly at this address.
              </p>
            </div>
            
            <hr style="border: 0; border-top: 1px solid rgba(255, 255, 255, 0.1); margin: 30px 0;" />
            
            <div style="text-align: center; color: #666666; font-size: 11px; line-height: 1.6; font-weight: 300;">
              <p style="margin: 0;">Built for Students by <strong>Alok Srivastav</strong></p>
              <p style="margin: 4px 0 0 0;">Powered by Gemini & Ollama</p>
            </div>
          </div>
        `;

        await transporter.sendMail({
          from: `"Infinity AI" <${process.env.GMAIL_USER}>`,
          to: data.email.trim(),
          subject: "Feedback Received - Infinity AI",
          html: emailHtml,
        });

        console.log("Auto-reply email sent to:", data.email.trim());
      } catch (emailErr) {
        // Log the error but DO NOT block the user feedback response
        console.error("Failed to send auto-reply email:", emailErr);
      }
    } else {
      console.warn("GMAIL_USER or GMAIL_PASS environment variables are missing. Skipping email auto-reply.");
    }

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

export async function DELETE(req: Request) {
  try {
    if (!process.env.KV_REST_API_URL) {
      return NextResponse.json({ error: "Database not connected" }, { status: 500 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Feedback ID is required" }, { status: 400 });
    }

    // To safely delete from a list by ID, we fetch all, filter, and rewrite.
    // (In a production relational DB, this would be a simple DELETE query)
    const allFeedback = await kv.lrange("infinity_feedback", 0, -1);
    
    // @ts-ignore - KV might return strings or parsed objects depending on version
    const parsedFeedback = allFeedback.map(item => typeof item === 'string' ? JSON.parse(item) : item);
    
    const remainingFeedback = parsedFeedback.filter((item: any) => item.id !== id);

    await kv.del("infinity_feedback");
    
    // Push them back (if there are any left)
    if (remainingFeedback.length > 0) {
      // We reverse to maintain the correct chronological order when using lpush
      const pipeline = kv.pipeline();
      for (const item of remainingFeedback.reverse()) {
        pipeline.lpush("infinity_feedback", JSON.stringify(item));
      }
      await pipeline.exec();
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
