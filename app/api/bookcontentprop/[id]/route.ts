import { db } from "@/libs/db";
import { ENV } from "@/libs/env";

type Props = {
    params: Promise<{
        id: string;
    }>;
};




export type API_BookContentProp_UpdateRequest = {
    title: string;
    body: string;
    info: string | null;
    imgUrl: string | null;
}


export async function PUT(reqest: Request, { params }: Props) {
    if (!ENV.isDevMode) return new Response("Not allowed", { status: 403 });

    const id = (await params).id;

    try {
        const form = await reqest.formData();
        const title = form.get("title") as string;
        const body = form.get("body") as string;
        const info = form.get("info") as string | null;
        const imgUrl = form.get("imgUrl") as string | null;


        await db.bookContentProp.update({
            where: {
                id
            },
            data: {
                title,
                body,
                info,
                imgUrl
            }
        })
        return new Response("OK");
        
    } catch {
        return new Response("Invalid request", { status: 400 });
        
    }
}



export async function DELETE(request: Request, { params }: Props) {
    if (!ENV.isDevMode) return new Response("Not allowed", { status: 403 });

    
    const id = (await params).id;



    try {
        await db.bookContentProp.delete({
            where: {
                id
            }
        })


        return new Response("OK");

    } catch {
        return new Response("Invalid request", { status: 400 });

    }
}