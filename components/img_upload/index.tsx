import { API_UploadBlob } from "@/app/api/blob/client";
import Image from "next/image";
import { useState } from "react";
import { Element_Controller_Response, Template } from "react-client-screen";

type Props = {
    _onUpload(result: string): void;
}

type Controller = {
    show(): void;
    hide(): void;
}


export function Upload_Img({ _onUpload }: Props): Element_Controller_Response<Controller, boolean> {
    const [file, setFile] = useState<File>()
    
    
    const form = Template.Fill_Form({
        async action(ev) {
            if (file) {
                const res = await API_UploadBlob(file);
                if (res) {
                    _onUpload(res.downloadUrl)
                    form.controller.hide();
                }
            }
        },
        children: (
            <>
                <label>
                    {
                        <Image src={file ? URL.createObjectURL(file) : "/no_image.png"} width={300} height={300} alt="" />
                    }
                </label>
                <label>
                    画像を選択
                    <input type="file" onChange={(ev) => {
                        const file = ev.target.files?.[0];
                        setFile(file);
                    }} />
                </label>
                <button>
                    アップロード
                </button>
            </>
        )
    });

    return form;
}