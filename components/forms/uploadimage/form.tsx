import { API_Blob_Upload } from "@/app/api/blob/client";
import { Img } from "@/components/props/img/prop";
import { useState } from "react";
import { Template } from "react-client-screen";

import styles from "./form.module.css";


type OnUpload = (url: string) => void;

type Controller = {
    show(onUpload: OnUpload): void;
    hide(): void;
}


export function Form_UploadImage() {
    const [file, setFile] = useState<File>();

    const [onUpload, setOnUpload] = useState<OnUpload>();
    
    const [uploading, setUploading] = useState(false);
    
    
    const form = Template.Fill_Form({
        className: styles.container,
        children: (
            <>
                <label>
                    <Img _src={file && URL.createObjectURL(file)} _size={500} _dev />
                    <input type="file" accept="image/*" style={{display: "none"}} onChange={(ev) => {
                        const file = ev.target.files?.[0];
                        setFile(file);
                    }}/>
                </label>
                <button>
                    アップロード
                </button>
            </>
        ),
        async action() {
            if (!file) return;
            setUploading(true);
            const res = await API_Blob_Upload(file);
            setUploading(false);

            if(res) {
                onUpload?.(res.downloadUrl);
                form.controller.hide();
            }
        },
    });



    const controller: Controller = {
        show(onUpload) {
            setOnUpload(() => onUpload);
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