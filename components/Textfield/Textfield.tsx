import clsx from "classnames";
import styles from "./Textfield.module.scss";
import { forwardRef } from "react";

export interface TextfieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Error message. When provided, component will display error style. */
  error?: string;
  /** Force theme regardless of system preference */
  theme?: "light" | "dark";
}

export const Textfield = forwardRef<HTMLInputElement, TextfieldProps>(
  ({ className, error, theme, ...rest }, ref) => {
    return (
      <div
        className={clsx(styles.container, className, {
          [styles.error]: !!error,
          [styles[theme ?? ""]]: !!theme,
        })}
      >
        <input
          ref={ref}
          type="text"
          className={styles.input}
          aria-invalid={!!error}
          {...rest}
        />
        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    );
  }
);

Textfield.displayName = "Textfield"; 