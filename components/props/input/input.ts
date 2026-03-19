import styles from "./input.module.css";

export type InputStyle = "primary" | "secondary" | "danger";

export const InputStyles: {[key in InputStyle]: string} = {
    primary: styles.primary,
    secondary: styles.secondary,
    danger: styles.danger
};