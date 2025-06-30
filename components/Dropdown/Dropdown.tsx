import clsx from "classnames";
import styles from "./Dropdown.module.scss";
import { useState, useRef, useEffect, forwardRef } from "react";

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  theme?: "light" | "dark";
  disabled?: boolean;
}

export const Dropdown = forwardRef<HTMLButtonElement, DropdownProps>(
  (
    { options, value, onChange, className, theme, disabled = false, ...rest },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selected = options.find((o) => o.value === value) ?? options[0];

    useEffect(() => {
      function handler(e: MouseEvent) {
        if (
          open &&
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setOpen(false);
        }
      }
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [open]);

    return (
      <div
        ref={containerRef}
        className={clsx(
          styles.container,
          className,
          theme && styles[theme],
          { [styles.open]: open, [styles.disabled]: disabled }
        )}
        {...rest}
      >
        <button
          ref={ref}
          type="button"
          disabled={disabled}
          className={styles.trigger}
          onClick={() => !disabled && setOpen(!open)}
        >
          <span className={styles.label}>{selected.label}</span>
          <span className={styles.chevron} aria-hidden="true" />
        </button>
        {open && (
          <ul className={styles.list} role="listbox">
            {options.map((opt) => (
              <li key={opt.value}>
                <button
                  type="button"
                  className={clsx(styles.option, {
                    [styles.selected]: opt.value === selected.value,
                  })}
                  onClick={() => {
                    onChange?.(opt.value);
                    setOpen(false);
                  }}
                >
                  {opt.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown"; 