import { db } from "@/libs/db";
import { ENV } from "@/libs/env";
import { NextResponse } from "next/server";
import { API_IndexRecord } from "../api";

export type API_BookContentCreateRequest = {
    bookId: string;
    title: string;
    color: string;
    index: number;
}


export async function POST(request: Request) {
    if (!ENV.isDevMode) return new Response("Not allowed", { status: 403 });

    try {
        const form = await request.formData();
        const bookId = form.get("bookId") as string;
        const title = form.get("title") as string;
        const color = form.get("color") as string;
        const index = parseInt(form.get("index") as string);
        
        const res = await db.bookContent.create({
            data: {
                bookId,
                title,
                color,
                index
            },
            include: {
                props: {
                    include: {
                        contentLink: {
                            select: {
                                id: true,
                                title: true,
                                bookId: true
                            }
                        }
                    }
                }
            }
        })
        return NextResponse.json(res);
        
        
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
                    db.bookContent.update({
                        where: {
                            id: item.id
                        },
                        data: {
                            index: item.index
                        }
                    })
                ))
            )
        });
        return new Response("OK");

    } catch (e) {
        console.error(e);
        return new Response("Invalid request", { status: 400 });

    }
}