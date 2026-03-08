import { db } from "@/libs/db";
import { ENV } from "@/libs/env";
import { NextRequest, NextResponse } from "next/server";


export type ContentCreateRequest = {
    title: string;
    body: string;
    categoryId: string;
}

export async function POST(req: NextRequest) {
    if (!ENV.isDevMode) return new Response("Not allowed", { status: 403 });

    try {
        const form = await req.formData();
        const title = form.get("title") as string;
        const body = form.get("body") as string;
        const categoryId = form.get("categoryId") as string;
        
        const content = await db.content.create(
            {
                data: {
                    title,
                    body,
                    categoryId
                }
            }
        )

        return NextResponse.json(content);

    } catch {
        return new Response("Invalid request", { status: 400 });

    }
    
}





