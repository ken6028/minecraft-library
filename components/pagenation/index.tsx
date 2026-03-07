"use client";

import Link from "next/link";
import styles from "./index.module.css";
import { MergeClassNames } from "react-client-screen";

type Props = {
    _total: number;
    _current: number;
    _size?: number;
    _generateLink: (page: number) => { href: string; label?: string };
}

export function Pagenation({ _total, _current, _size = 2, _generateLink }: Props) {
    return (
        <div className={styles.container}>
            {
                new Array(_size * 2 + 1).fill(0).map((_, index) => {
                    const page = _current - _size + index;
                    if (page < 1 || page > _total) return null;

                    const { href, label } = _generateLink(page);

                    return (
                        <Link key={index} href={href} className={MergeClassNames(
                            styles.page,
                            page === _current ? styles.current : undefined
                        )}>
                            {label ?? page}
                        </Link>
                    )
                })
            }
        </div>
    );
}