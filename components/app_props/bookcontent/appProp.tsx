import { EXModel_BookContentInfo, EXModel_BookInfo } from "@/libs/db";
import Image from "next/image";
import { AppProp_BookContentProp } from "../bookcontentprop/appProp";
import { Title, TitleWrapper } from "@/components/props/title/prop";
import { PopupInfo } from "@/components/props/popup/info/popup";
import { AppProp_Body } from "../body/appProp";

import styles from "./appProp.module.css";
import { useState } from "react";
import { Form_BookContent_Edit } from "@/components/forms/bookcontent/form";
import { Button } from "@/components/props/input/button/input";
import { Form_BookContentProp } from "@/components/forms/bookcontentprop/form";
import { API_BookContent_Delete } from "@/app/api/bookcontent/[id]/client";

type Props = {
    _edit: boolean;
    _bookContents: EXModel_BookContentInfo[];
    _bookContent: EXModel_BookContentInfo;
    _imgs: string[];
    _onDelete(): void;
}


export function AppProp_BookContent({ _edit, _bookContents, _bookContent, _imgs, _onDelete }: Props) {
    const [update, setUpdate] = useState(0);


    const form = Form_BookContent_Edit(_imgs);
    const form_bookContentProp = Form_BookContentProp();



    async function deleteContent() {
        const res =  await API_BookContent_Delete(_bookContent.id);
        if (res) {
            _bookContents.splice(_bookContents.findIndex(c => c.id === _bookContent.id), 1);
            _onDelete();
        }
    }

    return (
        <div className={styles.container}>
            <TitleWrapper>
                <Title>{_bookContent.title}</Title>
            </TitleWrapper>
            {
                _edit &&
                <PopupInfo style={{top: "0.5em", left: "2.5em"}} _type="left" _icon="/settings.png">
                    <Button onClick={() => {
                        form.controller.show(_bookContent);
                    }}>
                        コンテンツを編集
                    </Button>
                    <Button _type="danger" onClick={deleteContent}>
                        コンテンツを削除
                    </Button>
                    <Button onClick={() => {
                        form_bookContentProp.controller.show(_bookContent)
                    }}>
                        情報を追加
                    </Button>
                    <Button>
                        情報を並べ替え
                    </Button>
                </PopupInfo>
            }
            {
                _bookContent.info &&
                <PopupInfo>
                    <AppProp_Body>
                        {_bookContent.info}
                    </AppProp_Body>
                </PopupInfo>
            }
            <div className={styles.props}>
                {
                    _bookContent.props.map((prop, index) => (
                        <AppProp_BookContentProp key={index} _props={_bookContent.props} _prop={prop} _imgs={_imgs} _edit={_edit} _onDeleted={() => {setUpdate(v => v+1)}}/>
                    ))
                }
            </div>

            {form.element}
            {form_bookContentProp.element}
        </div>
    )
}