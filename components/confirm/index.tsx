import { useState } from "react"
import { Element_Controller_Response, MergeAttributes, MergeClassNames, Template } from "react-client-screen";

import styles from "./index.module.css";
import { Content_ControlButton } from "../content";



type Props = React.HTMLAttributes<HTMLDivElement> & {
    _onConfirm: () => void;
    _onCancel?: () => void;
}

type Controller = {
    show(): void;
    hide(): void;
}

export function Confirm({ _onConfirm, _onCancel, children, ...props }: Props): Element_Controller_Response<Controller, boolean> {
    const [show, setShow] = useState(false);

    const controller: Controller = {
        show() {
            setShow(true);
        },
        hide() {
            setShow(false);
        }
    }


    const element = show ?
    <Template.Fill onClick={(ev) => {
        ev.stopPropagation()
        controller.hide();
        _onCancel?.();
    }}>
        <div {...MergeAttributes(props, {
            className: styles.container,
            onClick: (ev) => {ev.stopPropagation();}
        })}>
            <div className={styles.message}>
                {children}
            </div>
            <div className={styles.buttons}>
                <Content_ControlButton _type="delete" onClick={() => {
                    controller.hide();
                    _onConfirm();
                }}>
                    はい
                </Content_ControlButton>
            </div>
        </div>
    </Template.Fill>
    :
    null;



    return (
        {
            element,
            controller,
            status: show
        }
    )
}