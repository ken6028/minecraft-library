import { db, EXModel_BookContentPropInfo } from "@/libs/db";
import { ENV } from "@/libs/env";
import { NextResponse } from "next/server";
import { API_IndexRecord } from "../api";

export type API_BookContentPropCreateRequest = {
    bookContentId: string;
    title: string;
    body: string;
    index?: number;
}


export async function POST(request: Request) {
    if (!ENV.isDevMode) return new Response("Not allowed", { status: 403 });


    try {
        const form = await request.formData();
        const bookContentId = form.get("bookContentId") as string;
        const title = form.get("title") as string;
        const body = form.get("body") as string;
        const _index = form.get("index") as string | null;
        const index = _index ? parseInt(_index) : undefined;
        
        
        const res = await db.bookContentProp.create({
            data: {
                bookContentId,
                title,
                body,
                index
            },
            include: {
                contentLink: {
                    select: {
                        id: true,
                        title: true,
                        bookId: true
                    }
                }
            }
        })
        return NextResponse.json<EXModel_BookContentPropInfo>(res);
        
        
    } catch {
        return new Response("Invalid request", { status: 400 });
    }
}





export async function PUT(request: Request) {
    if (!ENV.isDevMode) return new Response("Not allowed", { status: 403 });


    try {
        const req = await request.json() as API_IndexRecord[];

        await db.$transaction((db) => {
            return Promise.all(
                req.map(item => (
                    db.bookContentProp.update({
                        where: {
                            id: item.id
                        },
                        data: {
                            index: item.index
                        }
                    })
                ))
            )
        })
        return new Response("OK");
        
    } catch {
        return new Response("Invalid request", { status: 400 });
        
    }
}