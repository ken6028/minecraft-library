import { Button } from "@/components/props/input/button/input";
import { PopupInfo } from "@/components/props/popup/info/popup";
import { EXModel_BookContentPropInfo } from "@/libs/db";
import Image from "next/image";
import Link from "next/link";
import { AppProp_Body } from "../body/appProp";

import styles from "./appProp.module.css";
import { Title } from "@/components/props/title/prop";
import { Form_BookContentProp_Edit } from "@/components/forms/bookcontentprop/form";
import { useState } from "react";
import { API_BookContentProp_Delete, API_BookContentProp_Update } from "@/app/api/bookcontentprop/[id]/client";
import { Img } from "@/components/props/img/prop";


type Prop = {
    _edit: boolean;
    _props: EXModel_BookContentPropInfo[];
    _prop: EXModel_BookContentPropInfo;
    _imgs: string[];
    //ルート更新用
    _onDeleted(): void;
}

export function AppProp_BookContentProp({ _edit, _props, _prop, _imgs, _onDeleted }: Prop) {

    const form_bookContentProp_edit = Form_BookContentProp_Edit(_imgs);
    

    const [deleting, setDeleteing] = useState(false);
    
    async function deleteProp() {
        setDeleteing(true);
        const res = await API_BookContentProp_Delete(_prop.id);
        if (res) {
            _props.splice(_props.findIndex(p => p.id === _prop.id), 1);
            _onDeleted();
        }
        setDeleteing(false);

        
    }
    
    return (
        deleting ? (
            <div className={styles.container}>
                <Title>
                    削除中
                </Title>
            </div>
        ) : (

            <div className={styles.container}>
                {
                    _edit &&
                    <PopupInfo style={{top: "0.5em", right: "2.5em"}} _type="right" _icon="/settings.png" >
                        <Button onClick={() => {form_bookContentProp_edit.controller.show(_prop)}}>
                            編集
                        </Button>
                        <Button _type="danger" onClick={deleteProp} disabled={deleting}>
                            削除
                        </Button>
                    </PopupInfo>
                }
                {
                    _prop.info &&
                    <PopupInfo style={{right: "0.5em"}} _type="right" >
                        <AppProp_Body>
                            {_prop.info}
                        </AppProp_Body>
                    </PopupInfo>
                }
                <Title>
                    {_prop.title}
                </Title>
                <Img _src={_prop.imgUrl} _size={500}/>
                {
                    _prop.contentLink &&
                    <Link href={`/book/${_prop.contentLink.bookId}#${_prop.contentLink.id}`}>
                        {_prop.contentLink.title}
                    </Link>
                }
                <div>
                    <AppProp_Body>
                        {_prop.body}
                    </AppProp_Body>
                </div>
                {
                    form_bookContentProp_edit.element
                }
            </div>
        )
    )
}