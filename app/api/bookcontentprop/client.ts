import { EXModel_BookContentPropInfo } from "@/libs/db";
import { API_BookContentPropCreateRequest } from "./route";
import { API_IndexRecord } from "../api";

export async function API_BookContentProp_Create({ bookContentId, title, body, index }: API_BookContentPropCreateRequest) {
    const form = new FormData();
    form.append("bookContentId", bookContentId);
    form.append("title", title);
    form.append("body", body);
    if (index !== undefined) form.append("index", index.toString());

    const res = await fetch("/api/bookcontentprop", {
        method: "POST",
        body: form
    }).then(res => res.ok ? res.json() as Promise<EXModel_BookContentPropInfo> : null).catch(res => null);

    return res;
}




export async function API_BookContentProp_UpdateIndex(props: API_IndexRecord[]) {
    const res = await fetch("/api/bookcontentprop", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(props)
    });
    return res.ok;
}