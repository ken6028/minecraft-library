import { list, put } from "@vercel/blob";
import { PUBLIC } from "./public";

import fs from "fs";
import path from "path";



const isSaveMode = PUBLIC.isDevMode && process.env.SAVE_API === "true";

const tmp_path = path.join(process.cwd(), "tmp.json");
const BlobUrls: string[] = [];

if (isSaveMode) {
    if (fs.existsSync(tmp_path)) {
        const data = fs.readFileSync(tmp_path, "utf-8");
        const urls = JSON.parse(data) as string[];
        BlobUrls.push(...urls);
    } else {
        console.warn("init blob url list");
        list().then(res => {
            const urls = res.blobs.map(b => b.downloadUrl);
            BlobUrls.push(...urls);
            fs.writeFileSync(tmp_path, JSON.stringify(BlobUrls), "utf-8");
        });
    }

}


export async function GetBlobUrls() {
    if (PUBLIC.isDevMode) {
        if (process.env.SAVE_API === "true") {
            return BlobUrls;
        }
        console.warn("use blob list api");
        return (await list()).blobs.map(b => b.downloadUrl);
    }
    return [];
}


export async function AddBlob(file: File) {
    if (!PUBLIC.isDevMode) return null;

    if (!file.type.startsWith("image/")) return null;
    
    const result = await put(path.join("/image", crypto.randomUUID()), file, {
        access: "public",
        contentType: file.type
    });

    if (isSaveMode) {
        BlobUrls.push(result.downloadUrl);
        fs.writeFileSync(tmp_path, JSON.stringify(BlobUrls), "utf-8");
    }

    return result;
}