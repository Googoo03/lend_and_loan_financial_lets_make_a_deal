import { list } from "@vercel/blob";
import { NextResponse } from "next/server.js";

export async function GET() {
  const { blobs } = await list({ prefix: "prizes/", token: process.env.LNLLMAD_READ_WRITE_TOKEN });

  return NextResponse.json({ prizes: blobs });
}
