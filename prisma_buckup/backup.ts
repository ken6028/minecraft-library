import { db } from "../libs/db";
import fs from "fs";
import path from "path";


db.category.findMany(
    {
        orderBy: {
            index: "asc"
        }
    }
).then(res => {
    const filePath = path.join(__dirname, "category.json");
    fs.writeFileSync(filePath, JSON.stringify(res), "utf-8");
})

db.content.findMany(
    {
        orderBy: {
            index: "asc"
        }
    }
).then(res => {
    const filePath = path.join(__dirname, "content.json");
    fs.writeFileSync(filePath, JSON.stringify(res), "utf-8");
})

db.contentprop.findMany(
    {
        orderBy: {
            index: "asc"
        }
    }
).then(res => {
    const filePath = path.join(__dirname, "contentprop.json");
    fs.writeFileSync(filePath, JSON.stringify(res), "utf-8");
})