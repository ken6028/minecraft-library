import Link from "next/link";
import styles from "./appProp.module.css";
import { JSX } from "react";
import { MergeAttributes, MergeClassNames } from "react-client-screen";
import { EXModel_BookSpine } from "@/libs/db";
import { isDarkColor } from "@/libs/color";



type Props = JSX.IntrinsicElements["a"] & {
    //ここに本の情報を入れる
    _book: EXModel_BookSpine;
}


export function AppProp_BookSpine({ _book, children, ...props }: Props) {
    const isDark = isDarkColor(_book.color);

    
    return (
        <Link
            {...MergeAttributes(props, {
                className: MergeClassNames(
                    styles.container,
                    isDark ? styles.dark : undefined
                ),
                style: {
                    backgroundColor: _book.color
                },
                title: _book.title
            })}
            href={`/book/${_book.id}`}
            draggable={false}
        >
            <div className={styles.bookmark} />
            <h2 className={styles.title}>
                {_book.title}
            </h2>
        </Link>
    )
}