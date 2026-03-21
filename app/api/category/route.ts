import { db, EXModel_BookCategory } from "@/libs/db";
import { ENV } from "@/libs/env";
import { NextResponse } from "next/server";
import { API_IndexRecord } from "../api";




export type API_CategoryCreateRequest = {
    name: string;
    isPublic: boolean;
    index: number;
}

export async function POST(request: Request) {
    if (!ENV.isDevMode) return new Response("Not allowed", { status: 403 });


    try {
        const form = await request.formData();
        const name = form.get("name") as string;
        const isPublic = form.get("isPublic") === "true";
        const index = parseInt(form.get("index") as string);

        const category: EXModel_BookCategory = await db.bookCategory.create({
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
                    },
                    include: {
                        _count: {
                            select: {
                                content: {
                                    where: {
                                        isPublic: false
                                    }
                                }
                            }
                        }
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



export async function PUT(request: Request) {
    if (!ENV.isDevMode) return new Response("Not allowed", { status: 403 });

    try {
        const req = await request.json() as API_IndexRecord[];

        await db.$transaction((db) => {
            return Promise.all(
                req.map(item => (
                    db.bookCategory.update({
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

    } catch (e) {
        console.error(e);
        return new Response("Invalid request", { status: 400 });

    }
}