import { Element_Controller_Response, Template } from "react-client-screen";
import styles from "./form.module.css";
import { useState } from "react";
import { API_Book_Create } from "@/app/api/book/client";
import { EXModel_BookInfo, EXModel_BookSpine } from "@/libs/db";
import { Toggle } from "@/components/props/input/toggle/input";
import { API_Book_Update } from "@/app/api/book/[id]/client";



type Controller = {
    show(categoryId: string, books: EXModel_BookSpine[]): void;
    hide(): void;
}

export function Form_Book(): Element_Controller_Response<Controller, boolean> {
    const [category, setCategory] = useState("");
    const [rawBooks, setRawBooks] = useState<EXModel_BookSpine[]>([]);
    

    const [title, setTitle] = useState("");
    const [color, setColor] = useState("#000000");
    
    const [creating, setCreating] = useState(false);
    
    const form = Template.Fill_Form({
        className: styles.container,
        children: (
            <>
                <h2>本を作成</h2>
                {
                    creating ? (
                        <p>作成中...</p>
                    ) : (
                        <>
                            <label>
                                タイトル
                                <input type="text" value={title} onChange={(ev) => {setTitle(ev.currentTarget.value)}}/>
                            </label>
                            <label>
                                色
                                <input type="color" value={color} onChange={(ev) => {setColor(ev.currentTarget.value)}}/>
                            </label>
                            <button type="submit">作成</button>
                        </>
                    )
                }
            </>
        ),
        async action() {
            setCreating(true);
            const res = await API_Book_Create({
                title,
                color,
                categoryId: category,
                index: rawBooks.length
            });
            if (res) {
                setTitle("");
                setColor("#000000");
                rawBooks.push(res);
                form.controller.hide();
            }
            setCreating(false);
            
        }
    })


    const controller: Controller = {
        show(categoryId, books) {
            setCategory(categoryId);
            setRawBooks(books);
            form.controller.show();
        },
        hide() {
            rawBooks.length = 0;
            form.controller.hide();
        }
    };

    return (
        {
            ...form,
            controller
        }
    )
}











type EditController = {
    show(book: EXModel_BookInfo): void;
    hide(): void;
}


export function Form_Book_Edit(): Element_Controller_Response<EditController, boolean> {
    const [raw, setRaw] = useState<EXModel_BookInfo>();

    const [title, setTitle] = useState("");
    const [color, setColor] = useState("#000000");
    const [isPublic, setIsPublic] = useState(false);
    
    const [updating, setUpdating] = useState(false);


    const form = Template.Fill_Form({
        children: (
            <>
                <h2>本を編集</h2>
                {
                    updating ? (
                        <p>保存中...</p>
                    ) : (
                        <>
                            <label>
                                タイトル
                                <input type="text" value={title} onChange={(ev) => {setTitle(ev.currentTarget.value)}}/>
                            </label>
                            <label>
                                色
                                <input type="color" value={color} onChange={(ev) => {setColor(ev.currentTarget.value)}}/>
                            </label>
                            <label>
                                公開
                                <Toggle checked={isPublic} onChange={() => {setIsPublic(v => !v)}} />
                            </label>
                            <button type="submit">保存</button>
                        </>
                    )
                }
            </>
        ),
        async action() {
            if (!raw) return;
            
            setUpdating(true);
            const res = await API_Book_Update(raw.id, {
                title,
                color,
                isPublic
            });
            setUpdating(false);

            if (res) {
                raw.title = title;
                raw.color = color;
                raw.isPublic = isPublic;

                form.controller.hide();
            }
        }
    })



    const controller: EditController = {
        show(book) {
            setRaw(book);
            setTitle(book.title);
            setColor(book.color);
            setIsPublic(book.isPublic);

            form.controller.show();
        },
        hide() {
            form.controller.hide();
        }
    }




    return (
        {
            ...form,
            controller
        }
    )



}