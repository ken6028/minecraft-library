"use client";

import { Frame, FrameProps } from "@/components/frame"
import { Prisma } from "@/generated/prisma/client"
import { Content } from "@/components/content"

export type ScreenProps = {
    _contentInfo: Prisma.contentGetPayload<
        {
            include: {
                contentprop: true
            }
        }
    >;
    _imgUrls: string[];
    _editMode?: boolean;
}

type Props = FrameProps & ScreenProps;

export function Screen_ContentInfo({ _contentInfo, _imgUrls, _editMode, ...props }: Props) {
    return (
        <Frame {...props}>
            <Content _contentInfo={_contentInfo} _imgUrls={_imgUrls} _editorMode={_editMode} />
        </Frame>
    )
}