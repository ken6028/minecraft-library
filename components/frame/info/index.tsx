import { useState } from "react";
import styles from "./index.module.css";
import { MergeClassNames } from "react-client-screen";

export function SiteInfo() {
    const [show, setShow] = useState(false);
    
    
    
    return (
        <div className={styles.container}>
            <button className={styles.button} onClick={() => setShow(prev => !prev)}>
                {
                    show ? "閉じる" : "サイトについて"
                }
            </button>
            <div className={MergeClassNames(styles.info, show ? styles.show : styles.hide)}>
                <p>このサイトは <strong>Minecraft</strong> 及び <strong>シャオメイ</strong> の公式サイトではありません。</p>
                <p>このサイトのコンテンツは個人が作成したものであり、公式の情報とは異なる場合があります。</p>
                <p>また、一部名実際とは異なる表記を使用しています。</p>
            </div>
        </div>
    )
}