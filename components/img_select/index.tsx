import { useState } from "react";
import { Element_Controller_Response, Template } from "react-client-screen";
import styles from "./index.module.css";
import Image from "next/image";
import { Upload_Img } from "../img_upload";


type Props = {
    _imgUrls: string[];
    _onSelect(url: string | null): void;
}

type Controller = {
    show(): void;
    hide(): void;
}

export function Select_Img({ _imgUrls, _onSelect }: Props): Element_Controller_Response<Controller, boolean> {
    const [show, setShow] = useState(false);

    const controller: Controller = {
        show() {
            setShow(true);
        },
        hide() {
            setShow(false);
        }
    }


    const { element: upload, controller: uploadController} = Upload_Img({_onUpload(imgUrl) {
        _imgUrls.push(imgUrl);
    }});



    
    const element = show ?
    <Template.Fill onClick={(ev) => {
        ev.stopPropagation()
        controller.hide();
    }}>
        <div className={styles.container} onClick={(ev) => {ev.stopPropagation();}}>
            <div className={styles.control}>
                <Image src={"/no_image.png"} width={300} height={300} alt="" className={styles.item} onClick={() => {
                    controller.hide();
                    _onSelect(null);
                }} />
                <Image src={"/upload.png"} width={300} height={300} alt="" className={styles.item} onClick={() => {
                    uploadController.show();
                }} />
            </div>
            {
                _imgUrls.map((url, index) => (
                    <Image key={index} src={url} width={300} height={300} alt="" className={styles.item} onClick={() => {
                        controller.hide();
                        _onSelect(url);
                    }}/>
                ))
            }
        </div>
        {upload}
    </Template.Fill>
    : null;



    return (
        {
            element,
            controller,
            status: show
        }
    )
}