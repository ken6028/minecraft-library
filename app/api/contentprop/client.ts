import { Prisma } from "@/generated/prisma/client";
import { ContentPropCreateRequest } from "./route";

export async function API_CreateContentProp({ title, body, contentId }: ContentPropCreateRequest) {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("contentId", contentId);

    const res = await fetch("/api/contentprop", {
        method: "POST",
        body: formData
    }).then(res => res.ok ? res.json() as Promise<Prisma.contentpropModel> : null).catch(res => null);

    return res;
}