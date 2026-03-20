import { PutBlobResult } from "@vercel/blob";

export async function API_Blob_Upload(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/blob", {
        body: formData,
        method: "POST"
    }).then((res) => {
        if (!res.ok) return null;
        return res.json() as Promise<PutBlobResult>
    }).catch(() => null);

    return res;
}