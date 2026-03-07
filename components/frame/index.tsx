"use client";


import { MediaClassName, MergeAttributes, MergeClassNames, useResponsiveMedia } from "react-client-screen";
import styles from "./index.module.css";
import { Template } from "react-client-screen";
import { Prisma } from "@/generated/prisma/client";
import Link from "next/link";



export type FrameProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
    _categories: Prisma.categoryModel[];
}


export function Frame({ _categories, children, ...props }: FrameProps) {
    const { element: loadingElement, controller: loadingController } = Template.Controller_Loading({});
    
    
    const media = useResponsiveMedia(() => {
        loadingController.hide(true);
    });
    
    return (
        <div {...MergeAttributes(props, {
            className: MergeClassNames(
                styles.container,
                MediaClassName(media, {
                    tablet: styles.mobile
                })
            )
        })}>
            {/* {loadingElement} */}

            <div className={styles.header}>
                <h1 className={styles.title}>
                    <Link href={"/"} >
                        うろ覚えMinecraft攻略本
                    </Link>
                </h1>
            </div>
            <div className={styles.contentArea}>
                <div className={styles.content}>
                    <div className={styles.categories}>
                        {
                            _categories.map((category, index) => (
                                <Link key={index} className={styles.category} href={`/category/${category.id}`} style={{ backgroundColor: `rgb(${category.red}, ${category.green}, ${category.blue})` }}>
                                        {category.name}
                                </Link>
                            ))
                        }
                    </div>
                    <div className={styles.main}>
                        {children}
                    </div>
                </div>
            </div>

        </div>
    )
}