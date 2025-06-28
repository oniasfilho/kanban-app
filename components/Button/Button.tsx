import clsx from "classnames";
import styles from "./Button.module.scss";
import { forwardRef } from "react";

export type ButtonVariant = "primary" | "secondary" | "destructive";
export type ButtonSize = "l" | "s";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  theme?: "light" | "dark";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "l", className, disabled, children, ...rest },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(
          styles.button,
          styles[variant],
          styles[size],
          { [styles.disabled]: disabled },
          className
        )}
        disabled={disabled}
        type={rest.type ?? "button"}
        aria-disabled={disabled}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
