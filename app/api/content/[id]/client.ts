import { Prisma } from "@/generated/prisma/client";
import { ContentDeleteResponse, ContentUpdateRequest } from "./route";



export async function API_DeleteContent(id: string) {
    const res = await fetch(`/api/content/${id}`, {
        method: "DELETE",
    }).then(res => res.ok ? res.json() as Promise<ContentDeleteResponse>: null).catch(res => null);

    return res;
}


export async function API_UpdateContent(id: string, { title, body, imgUrl }: ContentUpdateRequest) {
    const form = new FormData();
    form.set("title", title);
    form.set("body", body);
    if (imgUrl) form.set("imgUrl", imgUrl);

    const res = await fetch(`/api/content/${id}`, {
        method: "PUT",
        body: form
    }).then(res => res.ok ? res.json() as Promise<Prisma.contentModel>: null).catch(res => null);
    
    return res;
}