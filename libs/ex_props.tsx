import { Prisma } from "@/generated/prisma/client"
import { getCategories } from "./model"
import { Screen_ContentNotFound } from "@/components/_template/contentNotFound/screen";

type base = {
    _categories: Prisma.categoryModel[]
}

export async function EX_Props<T extends Record<string, unknown>>(props: T): Promise<T & base> {
    const _categories = await getCategories();

    return {
        ...props,
        _categories
    }
}


export async function Screen_Response<Prop, Component extends (props: Prop) => React.ReactNode>(Component: Component, props: Prop | undefined): Promise<React.ReactNode> {
    const _categories = await getCategories();

    if (props === undefined) {
        return Screen_ContentNotFound({
            _categories
        });
    } else {
        return Component({
            ...props,
            _categories
        });
    }
}