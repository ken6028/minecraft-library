import { PutBlobResult } from "@vercel/blob";

export async function API_UploadBlob(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/blob", {
        body: formData,
        method: "POST"
    }).then((res) => {
        if (!res.ok) return null;
        return res.json() as Promise<PutBlobResult>
    }).catch((res) => null);

    return res;
}