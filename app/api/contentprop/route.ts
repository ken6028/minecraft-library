import { db } from "@/libs/db";
import { PUBLIC } from "@/libs/public";
import { NextRequest, NextResponse } from "next/server";



export type ContentPropCreateRequest = {
    title: string;
    body: string;
    contentId: string;
}

export async function POST(req: NextRequest) {
    if (!PUBLIC.isDevMode) return new Response("Not allowed", { status: 403 });


    try {
        const form = await req.formData();
        const title = form.get("title") as string;
        const body = form.get("body") as string;
        const contentId = form.get("contentId") as string;
        const res = await db.contentprop.create(
            {
                data: {
                    title,
                    body,
                    contentId
                }
            }
        );

        return NextResponse.json(res);
        
    } catch {
        return new Response("Invalid request", { status: 400 });
        
    }
}