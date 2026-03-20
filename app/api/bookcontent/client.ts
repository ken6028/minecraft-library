import { EXModel_BookContentInfo } from "@/libs/db";
import { API_BookContentCreateRequest } from "./route";
import { API_IndexRecord } from "../api";

export async function API_BokkContent_Create({ bookId, title, color, index }: API_BookContentCreateRequest) {
    const form = new FormData();
    form.append("bookId", bookId);
    form.append("title", title);
    form.append("color", color);
    form.append("index", index.toString());

    return await fetch("/api/bookcontent", {
        method: "POST",
        body: form
    }).then(res => res.ok ? res.json() as Promise<EXModel_BookContentInfo> : null).catch(() => null);
}



export async function API_BookContent_UpdateIndex(contents: API_IndexRecord[]) {
    const res = await fetch("/api/bookcontent", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contents)
    });
    return res.ok;
}