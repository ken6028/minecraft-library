import { Prisma } from "@/generated/prisma/client";
import { ContentPropDeleteResponse } from "./route";



export async function API_DeleteContentProp(id: string) {
    const res = await fetch(`/api/contentprop/${id}`, {
        method: "DELETE",
    }).then(res => res.ok ? res.json() as Promise<ContentPropDeleteResponse>: null).catch(res => null);

    return res;
}

type UpdateContentPropParams = {
    title: string;
    body: string;
    imgUrl: string | null;
}

export async function API_UpdateContentProp(id: string, { title, body, imgUrl }: UpdateContentPropParams) {
    const form = new FormData();
    form.append("title", title);
    form.append("body", body);
    if (imgUrl) form.append("imgUrl", imgUrl);

    const res = await fetch(`/api/contentprop/${id}`, {
        method: "PUT",
        body: form
    }).then(res => res.ok ? res.json() as Promise<Prisma.contentpropModel>: null).catch(res => null);

    return res;
}