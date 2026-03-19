import { Screen_Home } from "@/components/_screens/home/screen";
import { ENV } from "@/libs/env";
import { DB_GetBookCategories } from "@/libs/model";

export default async function Page() {
    const _categories = await DB_GetBookCategories(!ENV.isDevMode);
    
    
    return (
        <Screen_Home _CanEdit={ENV.isDevMode} _categories={_categories}/>
    )
}