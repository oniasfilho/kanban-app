import clsx from "classnames";
import styles from "./ThemeToggle.module.scss";
import { forwardRef } from "react";
import Image from "next/image";

export interface ThemeToggleProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "type"
  > {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  theme?: "light" | "dark";
}

export const ThemeToggle = forwardRef<HTMLInputElement, ThemeToggleProps>(
  ({ checked = false, disabled, className, onChange, theme, ...rest }, ref) => {
    return (
      <label
        className={clsx(
          styles.container,
          theme && styles[theme],
          { [styles.disabled]: disabled },
          className
        )}
      >
        <Image
          src="/icons/icon-light-theme.svg"
          alt="Light theme"
          className={styles.icon}
          aria-hidden="true"
          width={18}
          height={18}
        />

        <input
          ref={ref}
          type="checkbox"
          className={styles.hiddenInput}
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
          aria-label="Toggle dark mode"
          {...rest}
        />
        <span className={styles.switch} aria-hidden="true" />

        <Image
          src="/icons/icon-dark-theme.svg"
          alt="Dark theme"
          className={styles.icon}
          aria-hidden="true"
          width={18}
          height={18}
        />
      </label>
    );
  }
);

ThemeToggle.displayName = "ThemeToggle";
