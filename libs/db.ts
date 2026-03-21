import { PrismaPg } from "@prisma/adapter-pg";
import { Prisma, PrismaClient } from "../generated/prisma/client";

if (!process.env.DATABASE_URL) {
    throw new Error("データベースのURLが環境変数DATABASE_URLに設定されていません。");
}

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });

export const db = new PrismaClient({ adapter });


export type EXModel_BookCategories = EXModel_BookCategory[];


export type EXModel_BookCategory = Prisma.BookCategoryGetPayload<{
    select: {
        id: true;
        name: true;

        index: true;
        isPublic: true;
        books: {
            select: {
                id: true;
                title: true;
                color: true;

                index: true;
                isPublic: true;
                _count: {
                    select: {
                        content: {
                            where: {
                                isPublic: true;
                            }
                        }
                    }
                }
            }
        }
    }
}>;


export type EXModel_BookSpine = Prisma.BookGetPayload<{
    select: {
        id: true;
        title: true;
        color: true;

        index: true;
        isPublic: true;
        _count: {
            select: {
                content: {
                    where: {
                        isPublic: true;
                    }
                }
            }
        }
    }
}>;



export type EXModel_BookInfo = Prisma.BookGetPayload<{
    include: {
        content: {
            include: {
                props: {
                    include: {
                        contentLink: {
                            select: {
                                id: true,
                                title: true,
                                bookId: true
                            }
                        }
                    }
                }
            }
        }
    }
}>;


export type EXModel_BookContentInfo = Prisma.BookContentGetPayload<{
    include: {
        props: {
            include: {
                contentLink: {
                    select: {
                        id: true,
                        title: true,
                        bookId: true
                    }
                }
            }
        }
    }
}>;


export type EXModel_BookContentPropInfo = Prisma.BookContentPropGetPayload<{
    include: {
        contentLink: {
            select: {
                id: true,
                title: true,
                bookId: true,
            }
        }
    }
}>;