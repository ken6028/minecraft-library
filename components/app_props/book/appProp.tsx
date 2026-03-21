import { EXModel_BookContentInfo, EXModel_BookInfo } from "@/libs/db"


import styles from "./appProp.module.css";
import { useEffect, useState } from "react";
import { AppProp_BookContent } from "../bookcontent/appProp";
import { PopupInfo } from "@/components/props/popup/info/popup";
import { Button } from "@/components/props/input/button/input";
import { Form_BookContent } from "@/components/forms/bookcontent/form";
import { Form_Book, Form_Book_Edit } from "@/components/forms/book/form";
import { API_Book_Delete } from "@/app/api/book/[id]/client";
import { Title, TitleWrapper } from "@/components/props/title/prop";
import { isDarkColor } from "@/libs/color";
import { Form_BookContent_Index } from "@/components/forms/Index/form";


type Props = {
    _edit: boolean;
    _book: EXModel_BookInfo;
    _link?: string;
    _imgs: string[]
}



export function AppProp_Book({ _edit, _book, _link, _imgs }: Props) {
    const [raw] = useState(_book);
    
    

    const sortedContents = raw.content.sort((a, b) => a.index - b.index).filter(c => c.isPublic || _edit);
    const defaultContent = sortedContents.find(c => c.id === _link) || sortedContents[0];
    

    const [currentContent, setCurrentContent] = useState<EXModel_BookContentInfo | undefined>(defaultContent);


    

    const form_book = Form_Book_Edit();
    const form_bookContent = Form_BookContent();
    const form_bookContentIndex = Form_BookContent_Index();



    const [deleting, setDeleting] = useState(false);
    async function deleteCall() {
        if (!confirm("本当にこの本を削除しますか？")) return;

        setDeleting(true);
        const res = await API_Book_Delete(raw.id);
        setDeleting(false);

        if (res) {
            location.href = "/";
        }
    }


    return (
        <div className={styles.container} style={{borderColor: _book.color}}>
            {
                deleting ? (
                    <TitleWrapper>
                        <Title>
                            削除中...
                        </Title>
                    </TitleWrapper>
                ) : (
                    <>
                        {
                            _edit &&
                            <PopupInfo style={{top: "0.5em", left: "3em"}} _type="left" _icon="/settings.png">
                                <Button onClick={() => form_book.controller.show(raw)}>
                                    本を編集
                                </Button>
                                <Button _type="danger" onClick={deleteCall}>
                                    本を削除
                                </Button>
                                <Button onClick={() => form_bookContent.controller.show(raw)}>
                                    コンテンツを追加
                                </Button>
                                <Button onClick={() => form_bookContentIndex.controller.show(raw.content)}>
                                    コンテンツを並べ替え
                                </Button>
                            </PopupInfo>
                        }
                        <div className={styles.contentIndexWrapper}>
                            {
                                sortedContents.map((content, index) => (
                                    <button
                                        key={index}
                                        className={styles.contentIndex}
                                        style={{backgroundColor: content.color, color: isDarkColor(content.color) ? "white" : "black"}}
                                        onClick={() => setCurrentContent(content)}
                                    >
                                        {content.title}
                                    </button>
                                ))
                            }
                        </div>
                        <div className={styles.contentArea}>
                            {
                                currentContent &&
                                <AppProp_BookContent _bookContents={raw.content} _bookContent={currentContent} _imgs={_imgs} _edit={_edit} _onDelete={() => {
                                    setCurrentContent(defaultContent);
                                }}/>
                            }
                        </div>
                        {form_book.element}
                        {form_bookContent.element}
                        {form_bookContentIndex.element}
                    </>
                )
            }
        </div>
    )
}