import { API_CategoryUpdateRequest } from "./route";

export function API_Category_Update(id: string, { name, isPublic }: API_CategoryUpdateRequest) {
    const form = new FormData();
    form.append("name", name);
    form.append("isPublic", isPublic ? "true" : "false");

    return fetch(`/api/category/${id}`, {
        method: "PUT",
        body: form
    }).then(res => res.ok).catch(res => false);

}



export async function API_Category_Delete(id: string) {
    return fetch(`/api/category/${id}`, {
        method: "DELETE"
    }).then(res => res.ok).catch(res => false);
}