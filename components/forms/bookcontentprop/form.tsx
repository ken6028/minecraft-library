import { API_BookContentProp_Update } from "@/app/api/bookcontentprop/[id]/client";
import { API_BookContentProp_Create } from "@/app/api/bookcontentprop/client";
import { EXModel_BookContentInfo, EXModel_BookContentPropInfo } from "@/libs/db";
import { useState } from "react";
import { Element_Controller_Response, Template } from "react-client-screen";
import { Form_SelectImage } from "../selectimage/form";
import { Img } from "@/components/props/img/prop";


import styles from "./form.module.css";



type Controller = {
    show(content: EXModel_BookContentInfo): void;
    hide(): void;
}


export function Form_BookContentProp(): Element_Controller_Response<Controller, boolean> {
    const [raw, setRaw] = useState<EXModel_BookContentInfo>();

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const [creating, setCreating] = useState(false);

    const form = Template.Fill_Form({
        children: (
            creating ? (
                <p>作成中...</p>
            ) : (
                <>
                    <h2>プロパティを作成</h2>
                    <label>
                        タイトル
                        <input type="text" value={title} onChange={(ev) => {setTitle(ev.target.value)}} />
                    </label>
                    <label>
                        内容
                        <textarea value={body} onChange={(ev) => {setBody(ev.target.value)}} />
                    </label>
                    <button type="submit">
                        作成
                    </button>
                </>
            )
        ),
        async action() {
            if (!raw) return;

            setCreating(true);
            const res = await API_BookContentProp_Create({
                bookContentId: raw.id,
                title,
                body,
                index: raw.props.length
            });
            setCreating(false);

            if (res) {
                raw.props.push(res);
                form.controller.hide();
            }
        }
    });


    const controller: Controller = {
        show(content) {
            setRaw(content);
            setTitle("");
            setBody("");
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
    show(prop: EXModel_BookContentPropInfo): void;
    hide(): void;
}

export function Form_BookContentProp_Edit(imgs: string[]): Element_Controller_Response<EditController, boolean> {
    const [raw, setRaw] = useState<EXModel_BookContentPropInfo>();

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [imgUrl, setImgUrl] = useState<string | null>(null);
    const [info, setInfo] = useState<string | null>(null);



    const form_img = Form_SelectImage();
    
    
    
    
    const [updating, setUpdating] = useState(false);

    const form = Template.Fill_Form({
        className: styles.container,
        children: (
            updating ? (
                <p>保存中...</p>
            ) : (
                <>
                    <h2>情報を編集</h2>
                    <label>
                        タイトル
                        <input type="text" value={title} onChange={(ev) => {setTitle(ev.target.value)}} />
                    </label>
                    <label>
                        内容
                        <textarea value={body} onChange={(ev) => {setBody(ev.target.value)}} />
                    </label>
                    <label>
                        補足情報
                        <textarea value={info ?? ""} onChange={(ev) => {setInfo(ev.target.value)}} />
                    </label>
                    <label onClick={() => {
                        form_img.controller.show(imgs, (url) => {setImgUrl(url)})
                    }}>
                        画像
                        <Img _src={imgUrl} _size={500} _dev/>
                    </label>
                    <button type="submit">
                        保存
                    </button>
                </>
            )
        ),
        async action() {
            if (!raw) return;

            setUpdating(true);
            const res = await API_BookContentProp_Update( raw.id, {
                title,
                body,
                imgUrl: imgUrl ?? null,
                info: info ?? null
            });
            setUpdating(false);

            if (res) {
                raw.title = title;
                raw.body = body;
                raw.imgUrl = imgUrl ?? null;
                raw.info = info ?? null;
                form.controller.hide();
            }
        }
    });


    const controller: EditController = {
        show(prop) {
            setRaw(prop);
            setTitle(prop.title);
            setBody(prop.body);
            setImgUrl(prop.imgUrl ?? "");
            setInfo(prop.info ?? "");
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