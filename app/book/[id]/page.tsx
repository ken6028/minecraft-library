import { Screen_Book } from "@/components/_screens/book/screen";
import { db } from "@/libs/db";
import { ENV } from "@/libs/env";
import { DB_GetBookInfo } from "@/libs/model";
import { GetBlobUrls } from "@/libs/vblob";
import { Metadata } from "next";
import { cacheLife, cacheTag } from "next/cache";
import { notFound } from "next/navigation";

type Props = {
    params: Promise<{
        id: string;
    }>
}



export async function generateStaticParams() {
    return [{ id: "a4252528-6007-48b8-a521-bce85ce978cd" }]

}



export async function generateMetadata({ params }: Props): Promise<Metadata> {
    "use cache"
    cacheTag("book")
    
    const { id } = await params;
    
    const book = await db.book.findUnique({
        where: {
            id
        },
        select: {
            title: true
        }
    });

    return (
        {
            title: book?.title
        }
    )
}




export default async function Page({ params }: Props) {
    "use cache"
    cacheTag("book")
    cacheLife({
        stale: 60 * 2,
        revalidate: 60 * 5
    })


    const { id } = await params;

    const [_book, _imgs] = await Promise.all([
        DB_GetBookInfo(id, !ENV.isDevMode),
        GetBlobUrls()
    ]);
    
    if (!_book) {
        return notFound();
    }
    
    return (
        <Screen_Book _CanEdit={ENV.isDevMode} _book={_book} _imgs={_imgs}/>
    );
}