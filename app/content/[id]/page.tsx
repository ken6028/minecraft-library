import { Frame } from "@/components/frame";
import { getCategories, getContentInfo } from "@/libs/model";
import { Screen_ContentInfo } from "./content";
import { GetBlobUrls } from "@/libs/vblob";
import { ENV } from "@/libs/env";

type Props = {
    params: Promise<{
        id: string;
    }>;
    searchParams: Promise<{
        preview: string
    }>
}

export default async function Page({ params, searchParams }: Props) {
    const { id } = await params;
    const isPreview = "preview" in (await searchParams);


    const [_contentInfo, _categories, _imgUrls] = await Promise.all([
        getContentInfo(id),
        getCategories(),
        GetBlobUrls()
    ]);

    // return (
    //     <div></div>
    // )

    if (_contentInfo === undefined) {
        return <Frame _categories={_categories}/>

    } else {
        return <Screen_ContentInfo _contentInfo={_contentInfo} _categories={_categories} _imgUrls={_imgUrls} _editMode={ENV.isDevMode && !isPreview} />
    }
}