import { Dialog } from "@headlessui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function DialogTitle({ children }: Props) {
  return (
    <Dialog.Title
      className="text-2xl font-semibold leading-8 tracking-wide"
      as="h3"
    >
      {children}
    </Dialog.Title>
  );
}
