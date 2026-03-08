import { db, EX_DB_ContentWithContentProp } from "./db";

export function getCategories() {
    const res = db.category.findMany({
        where: {
            isPublished: true
        },
        orderBy: {
            index: "asc"
        }
    });
    return res;
}

export async function getCategory(id: string) {
    const res = await db.category.findUnique({
        where: {
            id
        },
        include: {
            content: {
                orderBy: {
                    index: "asc"
                }
            }
        }
    });
    return res ?? undefined;
}

export function getContentsByCategoryId(categoryId: string) {
    const res = db.content.findMany({
        where: {
            categoryId
        },
        orderBy: {
            index: "asc"
        }
    });
    return res;
}

export async function getContentInfo(id: string): Promise<EX_DB_ContentWithContentProp | undefined> {
    const res = await db.content.findUnique({
        where: {
            id
        },
        include: {
            contentprop: {
                include: {
                    contentLink: true
                },
                orderBy: {
                    index: "asc"
                }
            }
        }
    });
    return res ?? undefined;
}