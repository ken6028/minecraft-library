import { db, EXModel_BookCategories, EXModel_BookInfo } from "./db";

export async function DB_GetBookCategories(publicOnly: boolean = true): Promise<EXModel_BookCategories> {
    
    const isPublic = publicOnly? {isPublic: publicOnly} : {};
    
    const categories = await db.bookCategory.findMany(
        {
            where: {
                ...isPublic
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
                        isPublic: true
                    }
                }
            }
        }
    );

    return categories;
}


export async function DB_GetBookInfo(bookId: string): Promise<EXModel_BookInfo | null> {
    const bookInfo = await db.book.findUnique(
        {
            where: {
                id: bookId
            },
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
        }
    );

    return bookInfo;
}