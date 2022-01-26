import { Dialog } from "@headlessui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function DialogTitle({ children }: Props) {
  return (
    <Dialog.Title className="text-lg font-medium leading-6" as="h3">
      {children}
    </Dialog.Title>
  );
}
