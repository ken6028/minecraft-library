import { Frame, FrameProps } from "@/components/frame";


export function Screen_ContentNotFound(props: FrameProps) {
    return (
        <Frame {...props}>
            <h2>コンテンツが見つかりませんでした</h2>
        </Frame>
    );
}