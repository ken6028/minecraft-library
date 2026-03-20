import { Screen_Home } from "@/components/_screens/home/screen";
import { ENV } from "@/libs/env";
import { DB_GetBookCategories } from "@/libs/model";
import { cacheLife } from "next/cache";

export default async function Page() {
    'use cache'
    cacheLife({
        stale: 60 * 5,
        revalidate: 60 * 5
    });

    const _categories = await DB_GetBookCategories(!ENV.isDevMode);
    
    
    return (
        <Screen_Home _CanEdit={ENV.isDevMode} _categories={_categories}/>
    )
}