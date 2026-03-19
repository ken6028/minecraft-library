/**
 * 色が暗いかどうかを判定する関数
 * @param color 
 * @returns 
 */
export function isDarkColor(color: string) {
    const [r, g, b] = color.match(/\w\w/g)?.map(c => parseInt(c, 16)) ?? [0, 0, 0];
    //輝度計算
    return (r*0.3 + g*0.6 + b*0.1) < 128;
}