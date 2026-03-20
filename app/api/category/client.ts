import { EXModel_BookCategory } from "@/libs/db";
import { API_CategoryCreateRequest } from "./route";
import { API_IndexRecord } from "../api";

export function API_Category_Create({ name, isPublic, index }: API_CategoryCreateRequest) {
    const form = new FormData();
    form.append("name", name);
    form.append("isPublic", isPublic ? "true" : "false");
    form.append("index", index.toString());

    return fetch("/api/category", {
        method: "POST",
        body: form
    }).then(res => res.ok ? res.json() as Promise<EXModel_BookCategory> : null).catch(() => null);
}


export async function API_Category_UpdateIndex(records: API_IndexRecord[]) {
    return fetch("/api/category", {
        method: "PUT",
        body: JSON.stringify(records)
    }).then(res => res.ok).catch(() => false);
}