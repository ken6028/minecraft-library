import { Screen_Book } from "@/components/_screens/book/screen";
import { db } from "@/libs/db";
import { ENV } from "@/libs/env";
import { DB_GetBookInfo } from "@/libs/model";
import { GetBlobUrls } from "@/libs/vblob";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
    params: Promise<{
        id: string;
    }>
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
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
    const { id } = await params;

    const [_book, _imgs] = await Promise.all([
        DB_GetBookInfo(id),
        GetBlobUrls()
    ]);
    
    if (!_book) {
        return notFound();
    }
    
    return (
        <Screen_Book _CanEdit={ENV.isDevMode} _book={_book} _imgs={_imgs}/>
    );
}