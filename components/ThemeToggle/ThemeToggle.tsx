import clsx from "classnames";
import styles from "./ThemeToggle.module.scss";
import { forwardRef } from "react";

export interface ThemeToggleProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "type"> {
  /**
   * Whether dark mode is enabled.
   */
  checked?: boolean;
  /**
   * Called when the toggle changes.
   */
  onChange?: (checked: boolean) => void;
  /**
   * Visual theme override for the component container itself (light or dark)
   * so it renders correctly inside Storybook previews.
   */
  theme?: "light" | "dark";
}

/**
 * Switch component that lets users toggle between light & dark themes.
 *
 * The switch is a visually-hidden checkbox that controls a styled slider.
 * Icons on each side illustrate the active theme.
 */
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
        <img
          src="/icons/icon-light-theme.svg"
          alt="Light theme"
          className={styles.icon}
          aria-hidden="true"
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

        <img
          src="/icons/icon-dark-theme.svg"
          alt="Dark theme"
          className={styles.icon}
          aria-hidden="true"
        />
      </label>
    );
  }
);

ThemeToggle.displayName = "ThemeToggle"; 