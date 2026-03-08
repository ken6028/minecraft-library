import { Prisma } from "@/generated/prisma/client";
import Link from "next/link";

import styles from "./index.module.css";



type Props = React.HTMLAttributes<HTMLSpanElement> & {
    _content: Prisma.contentModel;
}

export function LinkedContent({_content, ...props}: Props) {
    return (
        <span {...props}>
            ページ:
            <Link href={`/content/${_content.id}`} className={styles.link}>
                {_content.title}
            </Link>
        </span>
    )
}