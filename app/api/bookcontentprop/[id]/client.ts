import { API_BookContentProp_UpdateRequest } from "./route";

export async function API_BookContentProp_Update(id: string, { title, body, info, imgUrl }: API_BookContentProp_UpdateRequest) {
    const form = new FormData();
    form.append("title", title);
    form.append("body", body);
    if (info !== null) form.append("info", info);
    if (imgUrl !== null) form.append("imgUrl", imgUrl);

    return fetch(`/api/bookcontentprop/${id}`, {
        method: "PUT",
        body: form
    }).then(res => res.ok).catch(() => false);
}




export async function API_BookContentProp_Delete(id: string) {
    return fetch(`/api/bookcontentprop/${id}`, {
        method: "DELETE"
    }).then(res => res.ok).catch(() => false);
}