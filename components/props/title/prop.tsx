import { MergeAttributes } from "react-client-screen";
import styles from "./prop.module.css";
import type { JSX } from "react";

export function Title(props: JSX.IntrinsicElements["h1"]) {
    return (
        <h1 {...MergeAttributes(props, {
            className: styles.title
        })}/>
    )
}

export function SubTitle(props: JSX.IntrinsicElements["h2"]) {
    return (
        <h2 {...MergeAttributes(props, {
            className: styles.subTitle
        })}/>
    )
}


export function TitleWrapper(props: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div {...MergeAttributes(props, {
            className: styles.container
        })}/>
    )
}