import Image from "next/image";
import { JSX } from "react";

import styles from "./prop.module.css";
import { MergeAttributes } from "react-client-screen";

type Props = JSX.IntrinsicElements["div"] & {
    _src: string | undefined | null;
    _size: number;
    _dev?: boolean | undefined;
}

export function Img({ _src, _size, _dev=false, ...props }: Props) {
    return (
        (_src && (_src.length !== 0)) ? (
            <div {...MergeAttributes(props, {
                className: styles.container
            })}>
                <Image src={_src} alt="" width={_size} height={_size} className={styles.img} />
            </div>
        ) : (
            _dev ? (
                <div {...MergeAttributes(props, {
                    className: styles.container
                })}>
                    <Image src={"/no_image.png"} alt="" width={_size} height={_size} className={styles.img} />
                </div>
            ) : null
        )
    )
}