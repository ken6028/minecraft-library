import { MergeAttributes } from "react-client-screen";

import styles from "./frame.module.css";
import { Title } from "@/components/props/title/prop";
import Link from "next/link";
import { PopupInfo } from "@/components/props/popup/info/popup";


export function Frame_Base({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    
    
    
    return (
        <div {...MergeAttributes(props, {
            className: styles.container
        })}>
            <div className={styles.header}>
                <PopupInfo style={{top: "0.5em", left: "1em", zIndex: 9999}} _type="left">
                    <p>このサイトは非公式のもので、Mojang Studiosとは一切関係ありません。</p>
                </PopupInfo>
                <Title>
                    <Link href={"/"}>マイクラ図書館</Link>
                </Title>
            </div>
            <div className={styles.contentArea} onMouseMove={(ev) => {
                //横スクロールを優先
                if (ev.buttons !== 1 || Math.abs(ev.movementY) < Math.abs(ev.movementX)*5) return;
                const div = ev.currentTarget;
                div.scrollTop -= ev.movementY;
            }}>
                {children}
            </div>
        </div>
    )
}