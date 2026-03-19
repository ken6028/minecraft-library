import { db } from "@/libs/db";
import { ENV } from "@/libs/env";

type Props = {
    params: Promise<{
        id: string;
    }>;
}




export type API_BookUpdateRequest = {
    title: string;
    color: string;
    isPublic: boolean;
}


export async function PUT(request: Request, { params }: Props) {
    if (!ENV.isDevMode) return new Response("Not allowed", { status: 403 });


    try {
        const id = (await params).id;

        const form = await request.formData();
        const title = form.get("title") as string;
        const color = form.get("color") as string;
        const isPublic = form.get("isPublic")  === "true";

        await db.book.update({
            where: {
                id
            },
            data: {
                title,
                color,
                isPublic
            }
        });


        return new Response("OK")

    } catch {
        return new Response("Invalid request", { status: 400 });
        
    }
}






export async function DELETE(request: Request, { params }: Props) {
    if (!ENV.isDevMode) return new Response("Not allowed", { status: 403 });

    try {
        const id = (await params).id;

        await db.book.delete({
            where: {
                id
            }
        });

        return new Response("OK")

    } catch (e) {
        console.error(e);
        return new Response("Invalid request", { status: 400 });
        
    }
}