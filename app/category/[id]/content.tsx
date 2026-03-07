"use client";

import { Content, Content_Control, Content_ControlButton } from "@/components/content";
import { Frame, FrameProps } from "@/components/frame";
import { Prisma } from "@/generated/prisma/client";
import Link from "next/link";

import styles from "./content.module.css";
import { useState } from "react";
import { Form_CreateContent } from "@/components/form/content";


type Props = FrameProps & {
    _categoryInfo: Prisma.categoryGetPayload<{
        include: {
            content: {
                orderBy: {
                    index: "asc"
                }
            }
        }
    }>;
    _imgUrls: string[];
    _editMode?: boolean;
}

export function Screen_Category({ _categoryInfo, _imgUrls, _editMode, ...props }: Props) {
    const [update, setUpdate] = useState(0);
    const [categoryInfo] = useState(_categoryInfo);

    
    const { element: createForm, controller: createController } = Form_CreateContent({
        _categoryId: _categoryInfo.id,
        _onCreate(content) {
            categoryInfo.content.push(content);
            setUpdate(prev => prev + 1);
        }
    })
    
    
    return (
        <Frame {...props}>
            {createForm}
            <Content_Control>
                <Content_ControlButton onClick={() => {createController.show()}}>
                    コンテンツを追加
                </Content_ControlButton>
            </Content_Control>
            <h1 className={styles.title}>{_categoryInfo.name}</h1>
            <div className={styles.container}>
                {
                    _categoryInfo.content.map((content, index) => (
                        <div key={index} className={styles.contentWrapper}>
                            <Link key={index} href={`/content/${content.id}`} className={styles.contentLink} >
                                {/* {index} */}
                                <Content _contentInfo={{...content, "contentprop": []}} _imgUrls={_imgUrls} _editorMode={_editMode} _showDescription={false} className={styles.content}/>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </Frame>
    )
}