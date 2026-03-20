import { API_CategoryUpdateRequest } from "./route";

export async function API_Category_Update(id: string, { name, isPublic }: API_CategoryUpdateRequest) {
    const form = new FormData();
    form.append("name", name);
    form.append("isPublic", isPublic ? "true" : "false");

    return await fetch(`/api/category/${id}`, {
        method: "PUT",
        body: form
    }).then(res => res.ok).catch(() => false);

}



export async function API_Category_Delete(id: string) {
    return await fetch(`/api/category/${id}`, {
        method: "DELETE"
    }).then(res => res.ok).catch(() => false);
}