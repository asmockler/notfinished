import { Dialog } from "@headlessui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function DialogDescription({ children }: Props) {
  return (
    <Dialog.Description className="pt-1 pb-4 text-sm text-slate-500 dark:text-slate-400">
      {children}
    </Dialog.Description>
  );
}
