import { MergeClassNames } from "react-client-screen";
import { InputStyle, InputStyles } from "../input"

import styles from "./input.module.css";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    _type?: InputStyle;
}


export function Toggle({_type="primary", children, ...props}: Props) {
    return (
        <label className={
            MergeClassNames(
                styles.container,
                styles[_type]
            )
        }>
            {children}
            <div className={MergeClassNames(styles.toggle, InputStyles[_type])}>
                <div className={
                    MergeClassNames(
                        styles.circle,
                        props.checked ? styles.on : undefined
                    )
                } />
            </div>
            <input type="checkbox" {...props} style={{display: "none"}}/>
        </label>
    )
}