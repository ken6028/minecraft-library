import { db } from "@/libs/db";
import { ENV } from "@/libs/env";
import { NextRequest, NextResponse } from "next/server";


type Props = {
    params: Promise<{
        id: string;
    }>;
};





export type ContentDeleteResponse = {
    id: string;
}

export async function DELETE(req: NextRequest, { params }: Props) {
    if (!ENV.isDevMode) return new Response("Not allowed", { status: 403 });

    const id = (await params).id;

    
    try {
        const result = await db.content.delete({
            where: {
                id
            }
        });

        return NextResponse.json({
            id: result.id
        });

    } catch (e) {
        console.log(e)
        return new Response("Invalid request", { status: 400 });

    }
}




export type ContentUpdateRequest = {
    title: string;
    body: string;
    imgUrl: string | null;
}

export async function PUT(req: NextRequest, { params }: Props) {
    if (!ENV.isDevMode) return new Response("Not allowed", { status: 403 });

    const id = (await params).id;

    try {
        const form = await req.formData();
        const title = form.get("title") as string;
        const body = form.get("body") as string;
        const imgUrl = form.get("imgUrl") as string | null;

        const result = await db.content.update({
            where: {
                id
            },
            data: {
                title,
                body,
                imgUrl
            }
        });

        return NextResponse.json(result);

    } catch (e) {
        console.log(e)
        return new Response("Invalid request", { status: 400 });

    }
}