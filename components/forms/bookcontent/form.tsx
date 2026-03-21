import { API_BokkContent_Create } from "@/app/api/bookcontent/client";
import { EXModel_BookContentInfo, EXModel_BookInfo } from "@/libs/db";
import { useState } from "react";
import { Element_Controller_Response, Template } from "react-client-screen";

import { Form_SelectImage } from "../selectimage/form";
import { API_BookContent_Update } from "@/app/api/bookcontent/[id]/client";
import { Toggle } from "@/components/props/input/toggle/input";


type Controller = {
    show(content: EXModel_BookInfo): void;
    hide(): void;
}


export function Form_BookContent(): Element_Controller_Response<Controller, boolean> {
    const [raw, setRaw] = useState<EXModel_BookInfo>();
    const [title, setTitle] = useState("");
    const [color, setColor] = useState("");

    const [creating, setCreating] = useState(false);
    
    const form = Template.Fill_Form({
        children: (
            creating ? (
                <p>作成中...</p>
            ) : (
                <>
                    <h2>コンテンツを作成</h2>
                    <label>
                        タイトル
                        <input type="text" value={title} onChange={(ev) => {setTitle(ev.target.value)}} />
                    </label>
                    <label>
                        色
                        <input type="color" value={color} onChange={(ev) => {setColor(ev.target.value)}} />
                    </label>
                    <button disabled={title.trim() === ""} type="submit">
                        作成
                    </button>
                </>
            )
        ),
        async action() {
            if (!raw) return;

            setCreating(true);
            const res = await API_BokkContent_Create({
                bookId: raw.id,
                title,
                color,
                index: raw.content.length
            });
            setCreating(false);

            if (res) {
                raw.content.push(res);
                form.controller.hide();
            }
        }
    })



    const controller: Controller = {
        show(content) {
            setRaw(content);
            setTitle("");
            setColor("#000000")
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


















type EditController = {
    show(content: EXModel_BookContentInfo): void;
    hide(): void;
}

export function Form_BookContent_Edit(imgs: string[]) {
    const [raw, setRaw] = useState<EXModel_BookContentInfo>();

    const [title, setTitle] = useState("");
    const [color, setColor] = useState("#000000");
    const [info, setInfo] = useState<string | null>(null);
    const [isPublic, setIsPublic] = useState(false);


    const [updating, setUpdating] = useState(false);
    
    

    const form_img = Form_SelectImage();
    
    const form = Template.Fill_Form({
        // className: styles.container,
        children: (
            updating ? (
                <h2>更新中...</h2>
            ) : (
                <>
                    <label>
                        タイトル
                        <input type="text" value={title} onChange={(ev) => {setTitle(ev.target.value)}} />
                    </label>
                    <label>
                        色
                        <input type="color" value={color} onChange={(ev) => {setColor(ev.target.value)}} />
                    </label>
                    <label>
                        補足情報
                        <textarea value={info ?? ""} onChange={(ev) => {setInfo(ev.target.value)}} />
                    </label>
                    <label>
                        公開設定
                        <Toggle checked={isPublic} onChange={(ev) => setIsPublic(ev.target.checked)} />
                    </label>
                    <button type="submit">更新</button>
                </>
            )
        ),
        async action() {
            if (!raw) return;
            
            setUpdating(true);
            const res = await API_BookContent_Update(raw?.id, {
                title,
                color,
                info,
                isPublic
            });
            setUpdating(false);

            if (res) {
                raw.title = title;
                raw.color = color;
                raw.info = info;
                raw.isPublic = isPublic;
                form.controller.hide();
            }
            
        }
    })



    const controller: EditController = {
        show(content) {
            setRaw(content);
            setTitle(content.title);
            setColor(content.color);
            setIsPublic(content.isPublic);
            form.controller.show();
        },
        hide() {
            form.controller.hide();
        }
    }



    return (
        {
            element: (
                <>
                    {form.element}
                    {form_img.element}
                </>
            ),
            controller,
            status: form.status
        }
    )

}