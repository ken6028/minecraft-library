import { db } from "@/libs/db";
import { ENV } from "@/libs/env";


type Params = {
    params: Promise<{
        id: string;
    }>;
};




export type API_CategoryUpdateRequest = {
    name: string;
    isPublic: boolean;
}


export async function PUT(request: Request, { params }: Params) {
    if (!ENV.isDevMode) return new Response("Not allowed", { status: 403 });

    const id = (await params).id;

    const form = await request.formData();
    const name = form.get("name") as string;
    const isPublic = form.get("isPublic") === "true";

    try {
        await db.bookCategory.update({
            where: {
                id
            },
            data: {
                name,
                isPublic
            }
        });

        return new Response("OK");

    } catch (e) {
        console.error(e);
        return new Response("Invalid request", { status: 400 });

    }
}




export async function DELETE(request: Request, { params }: Params) {
    if (!ENV.isDevMode) return new Response("Not allowed", { status: 403 });
    
    const id = (await params).id;

    try {
        await db.bookCategory.delete({
            where: {
                id
            }
        })
        return new Response("OK");

    } catch (e) {
        console.error(e);
        return new Response("Invalid request", { status: 400 });
        
    }
}