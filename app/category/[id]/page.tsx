import { db } from "@/libs/db";
import { getCategories, getCategory } from "@/libs/model";
import { Screen_Category } from "./content";
import { GetBlobUrls } from "@/libs/vblob";

type Props = {
    params: Promise<{
        id: string;
    }>;
};



export default async function Page({ params }: Props) {
    const { id } = await params;

    const [_categories, categoryInfo, _imgUrls] = await Promise.all([
        getCategories(),
        getCategory(id),
        GetBlobUrls()
    ]);
    


    if (categoryInfo === undefined) {
        return <div></div>
    } else {
        return <Screen_Category _categoryInfo={categoryInfo} _categories={_categories} _imgUrls={_imgUrls} /> 
    }
    
}