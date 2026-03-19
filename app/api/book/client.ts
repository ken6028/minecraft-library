import { EXModel_BookSpine } from "@/libs/db";
import { API_BookCreateRequest } from "./route";
import { API_IndexRecord } from "../api";

export async function API_Book_Create({ title, categoryId, color, index }: API_BookCreateRequest) {
    const form = new FormData();
    form.append("title", title);
    form.append("categoryId", categoryId);
    form.append("color", color);
    form.append("index", index.toString());

    const res = await fetch("/api/book", {
        method: "POST",
        body: form
    }).then(res => res.ok ? res.json() as Promise<EXModel_BookSpine> : null).catch(res => null);

    return res;
}



export async function API_Book_UpdateIndex(books: API_IndexRecord[]) {
    const res = await fetch("/api/book", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(books)
    });
    return res.ok;
}