import { MergeAttributes, MergeClassNames } from "react-client-screen";
import styles from "./input.module.css";
import { InputStyle, InputStyles } from "../input";


type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    _type?: InputStyle;
}


export function Button({ _type="primary", ...props }: Props) {
    return (
        <button {...MergeAttributes(props, {
            className: MergeClassNames(
                styles.button,
                InputStyles[_type]
            )
        })} />
    )
}