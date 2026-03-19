import { useState } from "react";
import { Element_Controller_Response } from "react-client-screen";
import { Toggle } from "../../../props/input/toggle/input";
import { PopupInfo } from "@/components/props/popup/info/popup";





type Props = {
    _default?: boolean
}

type Status = {
    edit: boolean;
}

export function EditorRoot({ _default=false }: Props): Element_Controller_Response<undefined, Status> {
    const [edit, setEdit] = useState(_default);
    
    const element = (
        <PopupInfo style={{top: "0.5em", right: "1em", position: "fixed", zIndex: 9999}} _type="right">
            <Toggle _type="primary" checked={edit} onChange={() => {setEdit((v) => !v)}}>編集モード</Toggle>
        </PopupInfo>
    );
    
    return (
        {
            element,
            controller: undefined,
            status: {
                edit
            }
        }
    )
}