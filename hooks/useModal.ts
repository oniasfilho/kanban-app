import { useCallback, useState } from "react";

export function useModal(defaultOpen = false) {
  const [open, setOpen] = useState(defaultOpen);
  const onClose = useCallback(() => setOpen(false), []);
  const onOpen = useCallback(() => setOpen(true), []);
  return { open, onClose, onOpen, setOpen } as const;
} 