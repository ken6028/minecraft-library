import { API_CreateContent } from "@/app/api/content/client";
import { Prisma } from "@/generated/prisma/client";
import { useState } from "react";
import { Template } from "react-client-screen";

type Props = {
    _categoryId: string;

    _onCreate(result: Prisma.contentModel): void;
}


export function Form_CreateContent({ _categoryId, _onCreate }: Props) {

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    
    const form = Template.Fill_Form({
        children: (
            <>
                <label>
                    タイトル
                    <input type="text" value={title} onChange={(ev) => setTitle(ev.target.value)} />
                </label>
                <label>
                    本文
                    <textarea value={body} onChange={(ev) => setBody(ev.target.value)} />
                </label>
                <button type="submit">作成</button>
            </>
        ),
        async action() {
            const res = await API_CreateContent({
                title,
                body,
                categoryId: _categoryId
            });
            
            if (res) {
                form.controller.hide();
                _onCreate(res);
            }
        }
    });

    return form;

}