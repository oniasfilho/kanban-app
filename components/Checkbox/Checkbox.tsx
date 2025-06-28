import clsx from "classnames";
import styles from "./Checkbox.module.scss";
import { forwardRef, useId } from "react";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  theme?: "light" | "dark";
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className, disabled, theme, ...rest }, ref) => {
    const generatedId = useId();
    const id = rest.id ?? generatedId;

    return (
      <label
        htmlFor={id}
        className={clsx(
          styles.container,
          theme && styles[theme],
          { [styles.disabled]: disabled },
          className
        )}
      >
        <input
          id={id}
          ref={ref}
          type="checkbox"
          className={styles.hiddenInput}
          disabled={disabled}
          aria-disabled={disabled}
          {...rest}
        />
        <span className={styles.box} aria-hidden="true" />
        {label && <span className={styles.label}>{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
