import { db, EXModel_BookCategories, EXModel_BookInfo } from "./db";

export async function DB_GetBookCategories(publicOnly: boolean = true): Promise<EXModel_BookCategories> {
    
    const isPublic = publicOnly ? {isPublic: true} : {};
    
    const categories = await db.bookCategory.findMany(
        {
            where: {
                ...isPublic,
            },
            select: {
                id: true,
                name: true,

                index: true,
                isPublic: true,
                books: {
                    where: {
                        ...isPublic
                    },
                    select: {
                        id: true,
                        title: true,
                        color: true,

                        index: true,
                        isPublic: true,
                        _count: {
                            select: {
                                content: {
                                    where: {
                                        isPublic: false
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    );

    return categories;
}


export async function DB_GetBookInfo(bookId: string, publicOnly: boolean = true): Promise<EXModel_BookInfo | null> {
    const isPublic = publicOnly ? {isPublic: true} : {};
    
    const bookInfo = await db.book.findUnique(
        {
            where: {
                id: bookId,
                ...isPublic
            },
            include: {
                content: {
                    where: {
                        ...isPublic
                    },
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
        }
    );

    return bookInfo;
}