"use client";

import { Frame_Base } from "@/components/_frames/base/frame";
import { AppProp_BookSpine } from "@/components/app_props/bookspline/appProp";
import { AppProp_BookShelf } from "@/components/app_props/bookshelf/appProp";

import { EditorRoot } from "@/components/app_props/editor/root/editor.root";
import { Form_Book } from "@/components/forms/book/form";
import { Form_BookIndex, Form_Category_Index } from "@/components/forms/Index/form";
import { Form_Category, Form_Category_Edit } from "@/components/forms/category/form";
import { Button } from "@/components/props/input/button/input";
import { PopupInfo } from "@/components/props/popup/info/popup";
import { EXModel_BookCategories } from "@/libs/db";
import { useState } from "react";
import { API_Category_Delete } from "@/app/api/category/[id]/client";


type Props = {
    _CanEdit?: boolean;
    _categories: EXModel_BookCategories
}



export function Screen_Home({ _CanEdit = false, _categories }: Props) {
    const [_, setUpdate] = useState(0);
    
    const { element: EditorRootElement, status: EditStatus } = EditorRoot({_default: _CanEdit});

    const [raw] = useState(_categories);

    const filteredCategories = raw.filter(c => c.isPublic || EditStatus.edit).sort((a, b) => a.index - b.index);
    


    const form_category_edit = Form_Category_Edit();
    const form_book = Form_Book();
    const form_bookIndex = Form_BookIndex();



    const form_category = Form_Category(() => {
        setUpdate(v => v +1);
    });
    const form_categoryIndex = Form_Category_Index();

    
    return (
        <Frame_Base>
            {
                _CanEdit &&
                EditorRootElement
            }
            {
                EditStatus.edit &&
                <PopupInfo>
                    <Button onClick={() => form_category.controller.show(raw)}>
                        カテゴリーを追加
                    </Button>
                    <Button onClick={() => form_categoryIndex.controller.show(raw)}>
                        カテゴリーを並べ替え
                    </Button>
                </PopupInfo>
            }
            {
                filteredCategories.map((category, index) => {
                    const filteredBooks = category.books.filter(b => b.isPublic || EditStatus.edit).sort((a, b) => a.index - b.index);
                    
                    return (
                        <AppProp_BookShelf key={index} _title={
                            <div style={{display: "flex"}}>
                                {category.name}
                            </div>
                        }>
                            {
                                EditStatus.edit &&
                                <PopupInfo style={{right: "0.5em"}} _type="right" _icon="/settings.png">
                                    <Button
                                        onClick={() => {
                                            form_category_edit.controller.show(category);
                                        }}
                                    >
                                        カテゴリを編集
                                    </Button>
                                    <Button
                                        _type="danger"
                                        onClick={async () => {
                                            const res = await API_Category_Delete(category.id);
                                            if (res) {
                                                raw.splice(raw.findIndex(c => c.id === category.id), 1);
                                                setUpdate(v => v+1);
                                            }
                                        }}
                                    >
                                        カテゴリを削除
                                    </Button>
                                    <Button
                                        onClick={() => {form_book.controller.show(category.id, category.books)}}
                                    >
                                        本を追加
                                    </Button>
                                    <Button onClick={() => {
                                        form_bookIndex.controller.show(filteredBooks);
                                    }}>
                                        本を並び替え
                                    </Button>
                                </PopupInfo>
                            }
                            {
                                filteredBooks.map((book, index) => (
                                    <AppProp_BookSpine key={index} _book={book}/>
                                ))
                            }
                        </AppProp_BookShelf>
                    );
                })
            }
            {form_category_edit.element}
            {form_categoryIndex.element}
            {form_book.element}
            {form_bookIndex.element}
            {form_category.element}
        </Frame_Base>
    )
}