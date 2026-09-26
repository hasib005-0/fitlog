"use client";

import { useEffect } from "react";

type ToastProps = { message: string; onClose: () => void };

export function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const t = window.setTimeout(onClose, 2200);
    return () => window.clearTimeout(t);
  }, [onClose]);
  return <div className="toast">{message}</div>;
}
