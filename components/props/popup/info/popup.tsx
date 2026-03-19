import { type JSX, useState } from "react";
import styles from "./popup.module.css";
import { MergeAttributes, MergeClassNames } from "react-client-screen";
import Image from "next/image";


type Props = JSX.IntrinsicElements["div"] & {
    _type?: "left" | "right";
    _icon?: string;
}

export function PopupInfo({ _type="left", _icon="/info.png", children, ...props}: Props) {
    const [show, setShow] = useState(false);
    
    return (
        <div {...MergeAttributes(props, {
            className: MergeClassNames(
                styles.container,
                styles[_type]
            )
        })}>
            <button
                className={
                    MergeClassNames(
                        styles.button,
                        styles[_type]
                    )
                }
                onClick={() => setShow(v => !v)}
            >
                <Image width={128} height={128} src={_icon} alt={show? "閉じる" : "開く"}/>
            </button>
            <div className={
                MergeClassNames(
                    styles.content,
                    show ? styles.show : undefined
                )
            }>
                {children}
            </div>
        </div>
    )
}