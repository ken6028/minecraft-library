import { PUBLIC } from "@/libs/public";
import { AddBlob } from "@/libs/vblob";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    if (!PUBLIC.isDevMode) return new Response("Not allowed", { status: 403 });
    const from = await req.formData();

    const file = from.get("file");

    if (!(file instanceof Blob)) {
        return new Response("No file", { status: 400 });
    }

    const result = await AddBlob(file);

    if (!result) {
        return new Response("Invalid file", { status: 400 });
    }

    return NextResponse.json(result);
}