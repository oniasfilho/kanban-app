import clsx from "classnames";
import styles from "./Modal.module.scss";
import {
  ComponentPropsWithoutRef,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { createPortal } from "react-dom";

export interface ModalBaseProps {
  open: boolean;
  onClose: () => void;
  size?: "s" | "m" | "l" | "fullscreen";
  ariaLabel?: string;
  showClose?: boolean;
  theme?: "light" | "dark";
}

export type ModalProps<P = {}> = P &
  Omit<ComponentPropsWithoutRef<"dialog">, keyof ModalBaseProps> &
  ModalBaseProps;

function ModalInner<P = {}>({
  open,
  onClose,
  children,
  size = "m",
  showClose = true,
  ariaLabel,
  theme,
  ...rest
}: ModalProps<P>) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (typeof dialog.showModal === "function") {
      if (!dialog.open) dialog.showModal();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, handleKey]);

  useEffect(() => {
    if (!open && dialogRef.current?.open) {
      dialogRef.current.close();
    }
  }, [open]);

  if (!open) return null;

  return (
    <dialog
      ref={dialogRef}
      className={clsx(
        styles.dialog,
        styles[size],
        theme && styles[theme],
        rest.className
      )}
      aria-modal="true"
      role="dialog"
      aria-label={ariaLabel}
      {...rest}
    >
      {showClose && (
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
      )}
      {children}
      <div className={styles.overlay} onClick={onClose} aria-hidden="true" />
    </dialog>
  );
}

export function Modal<P = {}>(props: ModalProps<P>) {
  if (typeof window === "undefined") return null;
  return createPortal(<ModalInner {...props} />, document.body);
}

interface SectionProps {
  children: ReactNode;
  className?: string;
}
export function Header({ children, className }: SectionProps) {
  return <header className={clsx(styles.header, className)}>{children}</header>;
}
export function Body({
  children,
  className,
}: SectionProps & { scroll?: boolean }) {
  return <div className={clsx(styles.body, className)}>{children}</div>;
}
export function Footer({
  children,
  className,
}: SectionProps & { align?: "left" | "right" }) {
  return <footer className={clsx(styles.footer, className)}>{children}</footer>;
}

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export type { Header as ModalHeader, Body as ModalBody, Footer as ModalFooter };
