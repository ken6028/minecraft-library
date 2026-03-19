import { useState, type JSX } from "react";
import styles from "./appProp.module.css";
import { MergeAttributes, MergeClassNames } from "react-client-screen";

type Props = JSX.IntrinsicElements["div"] & {
    _title: React.ReactNode;
}

export function AppProp_BookShelf({ _title, children, ...props }: Props) {
    const [mouseDown, setMouseDown] = useState(false);
    
    const behavior: JSX.IntrinsicElements["div"] = {
        onMouseDown(ev) {
            setMouseDown(true);
        },
        onMouseUp() {
            setMouseDown(false);
        },
        onMouseMove(ev) {
            if (ev.buttons !== 1 || Math.abs(ev.movementX) < Math.abs(ev.movementY)) return;
            const div = ev.currentTarget;
            div.scrollLeft -= ev.movementX;
        }
    }
    
    
    
    return (
        <div {...MergeAttributes(props, {
            className: MergeClassNames(
                styles.container,
                mouseDown ? styles.scroll : undefined
            )
        })} {...behavior}>
            <h2 className={styles.title}>
                {_title}
            </h2>
            <div className={styles.contentArea}>
                {children}
            </div>
        </div>
    )
}