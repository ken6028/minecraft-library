import Image from "next/image";
import { useState } from "react";
import { Element_Controller_Response, Template } from "react-client-screen";

import styles from "./form.module.css";
import { Img } from "@/components/props/img/prop";
import { Form_UploadImage } from "../uploadimage/form";



type OnSelect = (url: string | null) => void;

type Controller = {
    show(images: string[], onSelect: OnSelect): void;
    hide(): void;
}




export function Form_SelectImage(): Element_Controller_Response<Controller, boolean> {
    const [update, setUpdate] = useState(0);
    
    const [images, setImages] = useState<string[]>([]);
    const [onSelect, setOnSelect] = useState<OnSelect>();


    function select(url: string | null) {
        if (onSelect) onSelect(url);
        controller.hide();
    }
    
    
    const form = Template.Fill_Form({
        children: (
            <div className={styles.container}>
                <div className={styles.control}>
                    <Img _src={"/no_image.png"} _size={500} className={styles.image} onClick={() => {select(null)}}/>
                    <Img _src={"/upload.png"} _size={500} className={styles.image} onClick={() => {upload.controller.show((url) => {
                        images.unshift(url);
                        setUpdate((v) => v + 1);
                    })}} />
                </div>
                <div className={styles.imageWrapper}>
                    {
                        images.map((url, index) => (
                            <Img _src={url} _size={500} key={index} onClick={() => {select(url)}} className={styles.image} />
                        ))
                    }
                </div>
            </div>
        ),
        action() {}
    });




    const upload = Form_UploadImage();
    
    
    


    


    const controller: Controller = {
        show(imgs, onSelect) {
            setImages(imgs);
            setOnSelect(() => onSelect);
            form.controller.show();
        },
        hide() {
            form.controller.hide();
        }
    }

    return (
        {
            element: (
                <>
                    {form.element}
                    {upload.element}
                </>
            ),
            controller,
            status: form.status
        }
    );
}