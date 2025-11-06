import { list } from "@vercel/blob";
import { NextResponse } from "next/server.js";

export async function GET() {
  const { blobs } = await list({ prefix: "prizes/" });

  return NextResponse.json({ prizes: blobs });
}
