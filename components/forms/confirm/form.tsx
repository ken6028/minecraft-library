import { JSX } from "react";
import { Template } from "react-client-screen";



type Props = JSX.IntrinsicElements["div"] & {
    _onConfirm: () => void;
    _onCancel?: () => void;
}


export function Confirm({children, className, style, _onConfirm, _onCancel}: Props) {
    const form = Template.Fill_Form({
        children,
        className,
        style,
        async action() {
            
        }
    })
}