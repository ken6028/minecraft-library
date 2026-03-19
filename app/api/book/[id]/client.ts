import { API_BookUpdateRequest } from "./route";

export async function API_Book_Update(id: string, { title, color, isPublic }: API_BookUpdateRequest) {
    const form = new FormData();
    form.append("title", title);
    form.append("color", color);
    form.append("isPublic", isPublic.toString());

    return await fetch(`/api/book/${id}`, {
        method: "PUT",
        body: form
    }).then(res => res.ok).catch(res => false);
}









export async function API_Book_Delete(id: string) {
    return await fetch(`/api/book/${id}`, {
        method: "DELETE"
    }).then(res => res.ok).catch(res => false);
}