"use client";

import { Frame, FrameProps } from "@/components/frame";
import styles from "./screen.module.css";
import Link from "next/link";



export function Screen_Home({ _categories }: FrameProps) {
    return (
        <Frame _categories={_categories}>
            {/* <Pagenation _total={20} _current={1} _size={5} _generateLink={(page) => ({href: `./${page}`, label: `ページ${page}`})}/> */}
            <h1 className={styles.title}>このサイトについて</h1>
            <div className={styles.container}>
                <p>このサイトは、<Link href={"https://x.com/rin_syaomei"} className={styles.link}>シャオメイ</Link>さんの「<Link href={"https://www.youtube.com/watch?v=OuqkQsJP37Y"} className={styles.link}>10年前の攻略本で挑むハードコア</Link>」を観て、久しぶりにマイクラをしたくなった人が勢いに任せて作ったサイトです。</p>
                <p>主に私が覚えている<strong>おそらく正確</strong>な<strong>2年ほど前</strong>の<strong>うろ覚えの知識</strong>をもとに攻略本風にまとめています。</p>
                <p>もちろん攻略本風なので、サイト内検索や関連リンクなんて機能はつけておりません。頑張って目次から探してください!</p>
                <p>また、サイト制作の期間も1、2日程度で仕上げたものなのでバグ、品質には目をつぶってください。</p>
                <h2 className={styles.endTitle}>それでは、楽しいマイクラライフを!!!</h2>
            </div>
        </Frame>
    );
}