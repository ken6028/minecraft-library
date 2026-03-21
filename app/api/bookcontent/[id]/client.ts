import { API_BookContentUpdateRequest } from "./route";

export async function API_BookContent_Update(id: string, { title, color, isPublic }: API_BookContentUpdateRequest ) {
    const form = new FormData();
    form.append("title", title);
    form.append("color", color);
    form.append("isPublic", isPublic.toString());

    return fetch(`/api/bookcontent/${id}`, {
        method: "PUT",
        body: form
    }).then(res => res.ok).catch(() => false);
}


export async function API_BookContent_Delete(id: string) {
    return fetch(`/api/bookcontent/${id}`, {
        method: "DELETE"
    }).then(res => res.ok).catch(() => false);
}