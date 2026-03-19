import { db } from "@/libs/db";
import { ENV } from "@/libs/env";
import { NextResponse } from "next/server";




export type API_CategoryCreateRequest = {
    name: string;
    isPublic: boolean;
    index: number;
}

export async function POST(request: Request) {
    if (!ENV.isDevMode) return new Response("Not allowed", { status: 403 });

    const form = await request.formData();
    const name = form.get("name") as string;
    const isPublic = form.get("isPublic") === "true";
    const index = parseInt(form.get("index") as string);

    try {
        const category = await db.bookCategory.create({
            data: {
                name,
                isPublic,
                index
            },
            include: {
                books: {
                    select: {
                        id: true,
                        title: true,
                        color: true,

                        index: true,
                        isPublic: true
                    }
                }
            }
        });

        return NextResponse.json(category);

    } catch (e) {
        console.error(e);
        return new Response("Invalid request", { status: 400 });

    }
}