import { MergeAttributes, MergeClassNames } from "react-client-screen";
import styles from "./index.module.css";
import React, { HTMLAttributes, useState } from "react";
import { Prisma } from "@/generated/prisma/client";
import { ContentProp } from "./prop";
import Image from "next/image";
import { Select_Img } from "../img_select";
import { Confirm } from "../confirm";
import { API_DeleteContent, API_UpdateContent } from "@/app/api/content/[id]/client";
import { Form_CreateContentProp } from "../form/contentProp";
import Link from "next/link";



type Props = React.HTMLAttributes<HTMLDivElement> & {
    _contentInfo: Prisma.contentGetPayload<
        {
            include: {
                contentprop: true
            }
        }
    >;
    _showDescription?: boolean;
    _editorMode?: boolean;
    _imgUrls: string[]
}


export function Content({ _contentInfo, _showDescription=true, _editorMode=false, _imgUrls, children, ...props }: Props) {
    const [update, setUpdate] = useState(0);
    
    const [raw, setRaw] = useState(_contentInfo);
    const [title, setTitle] = useState(_contentInfo.title);
    const [body, setBody] = useState(_contentInfo.body);
    const [imgUrl, setImgUrl] = useState(_contentInfo.imgUrl);
    


    const canSave = title !== raw.title || body !== raw.body || imgUrl !== raw.imgUrl;



    const { element: deleteConfirm, controller: deleteConfirmController } = Confirm({
        children: "このコンテンツを削除してもよろしいですか？",
        async _onConfirm() {
            const res = await API_DeleteContent(_contentInfo.id);

            if (res) {
                window.location.href = "/";
            }
        }
    })


    const { element: createForm, controller:  createController } = Form_CreateContentProp({_contentId: _contentInfo.id, _onCreate(contentProp) {
        raw.contentprop.push(contentProp);
        setUpdate(prev => prev + 1);
    }})

    async function save() {
        const res =  await API_UpdateContent(_contentInfo.id, {
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
            <Link href={`/content/${_contentInfo.id}?preview`}>
                <Content_ControlButton>
                    プレビュー
                </Content_ControlButton>
            </Link>
            <Content_ControlButton onClick={() => {createController.show()}}>
                項目を追加
            </Content_ControlButton>
            <Content_ControlButton _type="delete" onClick={() => {
                deleteConfirmController.show();
            }}>
                削除
            </Content_ControlButton>
            <Content_ControlButton _type="save" disabled={!canSave} onClick={save}>
                保存
            </Content_ControlButton>
        </Content_Control>
        : null
    )





    return (
        <div {...MergeAttributes(props, {
            className: styles.container,
            style: {
                backgroundImage: _contentInfo.imgUrl ? `url(${_contentInfo.imgUrl})` : undefined
            }
        })}>
            {control}
            <Content_Title _title={title} _editorMode={_editorMode} _onChange={setTitle} />
            <Content_Img _imgUrls={_imgUrls} _src={imgUrl} width={400} height={400} alt="コンテンツサムネイル" _editorMode={_editorMode} _onChange={setImgUrl}/>
            {
                _showDescription &&
                <>
                    <Content_Body _body={body} _editorMode={_editorMode} _onChange={setBody} />
                    <div>
                        {
                            raw.contentprop.map((prop, index) => (
                                <ContentProp key={index} _contentProp={prop} _imgUrls={_imgUrls} _editorMode={_editorMode} className={_editorMode ? styles.outline : undefined} 
                                    _onDelete={() => {
                                        raw.contentprop.splice(raw.contentprop.findIndex(p => p.id === prop.id), 1);
                                        setUpdate(prev => prev + 1);
                                    }}
                                />
                            ))
                        }
                    </div>
                </>
            }

            {children}
            {deleteConfirm}
            {createForm}
        </div>
    )
}
















type ContentTitleProps = React.HTMLAttributes<HTMLHeadingElement> & {
    _title: string;
    _editorMode?: boolean;
    _onChange?: (title: string) => void;
}

export function Content_Title({ _title, _editorMode=false, _onChange, children, ...props }: ContentTitleProps) {
    const [editMode, setEditMode] = useState(false);

    // if (_title.length === 0) _title = "無題のコンテンツ";

    return (
        <h1 {...MergeAttributes(props, {
            className: styles.title,
            onClick: () => {
                if (_editorMode) {
                    setEditMode(true);
                }
            }
        })}>
            {
                editMode ?
                <input autoFocus value={_title} placeholder="タイトルを入力" onChange={(ev) => {_onChange?.(ev.target.value)}} onBlur={() => setEditMode(false)} />
                :
                _title
            }
            {children}
        </h1>
    )
}






type ContentBodyProps = React.HTMLAttributes<HTMLDivElement> & {
    _body: string;
    _editorMode?: boolean;
    _onChange?: (body: string) => void;
}
export function Content_Body({ _body, _editorMode, _onChange, children, ...props }: ContentBodyProps) {
    const [editMode, setEditMode] = useState(false);

    return (
        <div {...MergeAttributes(props, {
            className: styles.content_body,
            onClick: () => {
                if (_editorMode) {
                    setEditMode(true);
                }
            }
        })}>
            {
                editMode ?
                <textarea autoFocus value={_body} onChange={(ev) => {_onChange?.(ev.target.value)}} onBlur={() => setEditMode(false)} />
                :
                <div className={styles.content_body_text}>
                    {
                        _body.split(/[\n]/).filter(line => line !== "").map((line, index) => (
                            <p key={index}>{line}</p>
                        ))
                    }
                </div>
            }

            {children}
        </div>
    )
}






type Content_ImgProps = {
    _src: string | null;
    width: number;
    height: number;
    alt: string;
    _editorMode?: boolean;
    _onChange: (imgUrl: string | null) => void;
    _imgUrls: string[]
}

export function Content_Img({ _editorMode, _onChange, _imgUrls, _src: src, alt, ...props }: Content_ImgProps) {
    const { element, controller } = Select_Img({ _imgUrls, _onSelect: _onChange})

    
    return (
        !_editorMode && src === null ?
        null :
        <div className={styles.content_img} onClick={() => {controller.show()}}>
            {element}
            {
                _editorMode ?
                <Image {...props} src={src ?? "/no_image.png"} alt={alt} />
                :
                src !== null ?
                <Image {...props} src={src} alt={alt} />
                :
                null
            }
        </div>
    )
}






export function Content_Control(props: HTMLAttributes<HTMLDivElement>) {
    return <div {...MergeAttributes(props, {
        className: styles.control
    })} />
}


type Control_ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &  {
    _type?: "save" | "delete"
}

export function Content_ControlButton({_type, ...props}: Control_ButtonProps) {
    return (
        <button {...MergeAttributes(props, {
            className: MergeClassNames(
                styles.control_button,
                _type ? styles[_type] : undefined
            )
        })} />
    )
}