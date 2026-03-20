"use client";

import { Frame_Base } from "@/components/_frames/base/frame";

import { EditorRoot } from "@/components/app_props/editor/root/editor.root";
import { EXModel_BookInfo } from "@/libs/db";
import { AppProp_Book } from "@/components/app_props/book/appProp";


type Props = {
    _CanEdit?: boolean;
    _book: EXModel_BookInfo;
    _link?: string;
    _imgs: string[]
}



export function Screen_Book({ _CanEdit = false, _book, _imgs }: Props) {
    
    const { element: EditorRootElement, status: EditStatus } = EditorRoot({_default: _CanEdit});

    return (
        <Frame_Base>
            {
                _CanEdit &&
                EditorRootElement
            }
            <AppProp_Book _book={_book} _imgs={_imgs} _edit={EditStatus.edit} />
        </Frame_Base>
    )
}