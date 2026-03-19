import { list, put } from "@vercel/blob";
import { ENV } from "./env";

import fs from "fs";
import path from "path";




const tmp_path = path.join(process.cwd(), "tmp.json");
const BlobUrls: string[] = [];


//開発環境では、API制限対策のため、BlobのURLをローカルに保存しておく
if (ENV.isDevMode) {
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
    if (ENV.isDevMode) {
        // if (process.env.SAVE_API === "true") {
        //     return BlobUrls;
        // }
        // console.warn("use blob list api");
        // return (await list()).blobs.map(b => b.downloadUrl);


        //api制限対策のため、保存されたURLリストを返す
        return BlobUrls;
    }
    return [];
}


export async function AddBlob(file: File) {
    if (!ENV.isDevMode) return null;

    if (!file.type.startsWith("image/")) return null;
    
    const result = await put(path.join("/image", crypto.randomUUID()), file, {
        access: "public",
        contentType: file.type,
        cacheControlMaxAge: 60 * 60 * 24 * 30 * 3, //3ヶ月キャッシュ
    });

    BlobUrls.push(result.downloadUrl);
    fs.writeFileSync(tmp_path, JSON.stringify(BlobUrls), "utf-8");

    return result;
}