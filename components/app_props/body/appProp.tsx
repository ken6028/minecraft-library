import type { JSX } from "react";


export function AppProp_Body({ children, ...props }: JSX.IntrinsicElements["p"]) {
    if (typeof children === "string") {
        const lines = children.split("\n");
        return (
            <>
                {lines.map((line, index) => (
                    <p key={index} {...props}>
                        {line}
                    </p>
                ))}
            </>
        );
    }
    return children;
}