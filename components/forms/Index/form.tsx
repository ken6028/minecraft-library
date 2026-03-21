import { API_Book_UpdateIndex } from "@/app/api/book/client";
import { EXModel_BookCategory, EXModel_BookContentInfo, EXModel_BookContentPropInfo, EXModel_BookSpine } from "@/libs/db";
import { Element_Controller_Response } from "react-client-screen";

import { API_BookContent_UpdateIndex } from "@/app/api/bookcontent/client";
import { Form_Index_Base } from "./base";
import { API_BookContentProp_UpdateIndex } from "@/app/api/bookcontentprop/client";
import { API_Category_UpdateIndex } from "@/app/api/category/client";


type Controller = {
    show(books: EXModel_BookSpine[]): void;
    hide(): void;
}



export function Form_Category_Index()  {
    return Form_Index_Base<EXModel_BookCategory>(
        (v) => v.name,
        API_Category_UpdateIndex
    )
}





export function Form_BookIndex(): Element_Controller_Response<Controller, boolean> {
    return Form_Index_Base<EXModel_BookSpine>(
        (v) => v.title,
        API_Book_UpdateIndex
    )
}






export function Form_BookContent_Index() {
    return Form_Index_Base<EXModel_BookContentInfo>(
        (v) => v.title,
        API_BookContent_UpdateIndex
    )
}





export function Form_BookContentProp_Index() {
    return Form_Index_Base<EXModel_BookContentPropInfo>(
        (v) => v.title || v.body.substring(0, 20),
        API_BookContentProp_UpdateIndex
    )
}






