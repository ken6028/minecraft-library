import { Prisma } from "@/generated/prisma/client";
import { ContentCreateRequest } from "./route";

export async function API_CreateContent({ title, body, categoryId }: ContentCreateRequest) {
    const form = new FormData();
    form.append("title", title);
    form.append("body", body);
    form.append("categoryId", categoryId);

    const res = await fetch("/api/content", {
        method: "POST",
        body: form
    }).then(res => res.ok ? res.json() as Promise<Prisma.contentModel> : null).catch(res => null);

    return res;
}