import { Prisma } from "../generated/prisma/client";
import { db } from "../libs/db";


import _categories from "./category.json" with { type: "json" };
const categories = _categories as Prisma.categoryModel[];

import _contents from "./content.json" with { type: "json" };
const contents = _contents as Prisma.contentModel[];

import _contentprops from "./contentprop.json" with { type: "json" };
const contentprops = _contentprops as Prisma.contentpropModel[];

(async () => {
    for (const category of categories) {
        console.log(category);
        await db.category.create({
            data: {
                "id": category.id,
                "name": category.name,
                "isPublished": category.isPublished,
                "red": category.red,
                "green": category.green,
                "blue": category.blue
            }
        });
    }
    for (const content of contents) {
        console.log(content);
        await db.content.create({
            data: {
                "id": content.id,
                "title": content.title,
                "body": content.body,
                "imgUrl": content.imgUrl,
                "isPublished": content.isPublished,
                "categoryId": content.categoryId
            }
        });
    }
    for (const contentprop of contentprops) {
        console.log(contentprop);
        await db.contentprop.create({
            data: {
                "id": contentprop.id,
                "title": contentprop.title,
                "body": contentprop.body,
                "imgUrl": contentprop.imgUrl,
                "contentId": contentprop.contentId,
            }
        });
    }
})();