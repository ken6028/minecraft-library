import styles from "./index.module.css";
import { MergeAttributes } from "react-client-screen";
import { Content_Body, Content_Control, Content_ControlButton, Content_Img, Content_Title } from "..";
import { useState } from "react";
import { Confirm } from "@/components/confirm";
import { API_DeleteContentProp, API_UpdateContentProp } from "@/app/api/contentprop/[id]/client";
import { LinkedContent } from "../linkedcontent";
import { EX_DB_ContentPropWithLink } from "@/libs/db";

type Props = React.HTMLAttributes<HTMLDivElement> & {
    _contentProp: EX_DB_ContentPropWithLink;
    _imgUrls: string[];
    _editorMode?: boolean;

    _onDelete(): void;
}

export function ContentProp({ _contentProp, _imgUrls, _editorMode, _onDelete, children, ...props }: Props) {
    const [update, setUpdate] = useState(0);
    
    const [raw, setRaw] = useState(_contentProp);
    const [title, setTitle] = useState(_contentProp.title ?? "");
    const [body, setBody] = useState(_contentProp.body);
    const [imgUrl, setImgUrl] = useState(_contentProp.imgUrl);
    
    const canSave = title !== raw.title || body !== raw.body || imgUrl !== raw.imgUrl;


    const { element: deleteConfirm, controller: deleteConfirmController } = Confirm({
        children: "この項目を削除してもよろしいですか？",
        async _onConfirm() {
            const res = await API_DeleteContentProp(_contentProp.id);
            if (res) _onDelete();
        }
    })

    async function save() {
        const res = await API_UpdateContentProp(_contentProp.id, {
            title,
            body,
            imgUrl
        });

        if (res) {
            raw.title = res.title;
            raw.body = res.body;
            raw.imgUrl = res.imgUrl;
            setTitle(res.title);
            setBody(res.body);
            setImgUrl(res.imgUrl);
            setUpdate(prev => prev + 1);
        }
    }
    
    
    
    const control = (
        _editorMode ?
        <Content_Control>
            <Content_ControlButton _type="delete" onClick={() => {
                deleteConfirmController.show();
            }}>
                削除
            </Content_ControlButton>
            <Content_ControlButton _type="save" disabled={!canSave} onClick={save}>
                保存
            </Content_ControlButton>
            <div className={styles.swapWrapper}>
                <Content_ControlButton>
                    上へ
                </Content_ControlButton>
                <Content_ControlButton>
                    下へ
                </Content_ControlButton>
            </div>
        </Content_Control>
        : null
    )



    return (
        <div {...MergeAttributes(props, {
            className: styles.container
        })}>
            {control}
            {deleteConfirm}
            <Content_Img _src={imgUrl} width={1000} height={1000} alt="" _imgUrls={_imgUrls} _onChange={setImgUrl} _editorMode={_editorMode} />
            <Content_Title _title={title} _editorMode={_editorMode} _onChange={setTitle} />
            {
                <Content_Body _body={body} _editorMode={_editorMode} _onChange={setBody} />
            }
            {
                _contentProp.contentLink &&
                <LinkedContent _content={_contentProp.contentLink} />
            }
            {children}
        </div>
    )
}