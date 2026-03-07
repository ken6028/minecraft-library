import { API_CreateContentProp } from "@/app/api/contentprop/client";
import { Prisma } from "@/generated/prisma/client";
import { useState } from "react";
import { Template } from "react-client-screen";

import styles from "./index.module.css";

type Props = {
    _contentId: string;

    _onCreate(result: Prisma.contentpropModel): void;
}


export function Form_CreateContentProp({ _contentId, _onCreate }: Props) {

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
            const res = await API_CreateContentProp({
                title,
                body,
                contentId: _contentId
            });
            
            if (res) {
                form.controller.hide();
                _onCreate(res);
            }
        }
    });

    return form;

}