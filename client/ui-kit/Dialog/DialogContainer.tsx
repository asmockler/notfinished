import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/solid";
import { Fragment, ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClose(value: boolean): void;
  open: boolean;
}

export function DialogContainer({ children, onClose, open }: Props) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        open={open}
        onClose={onClose}
        className="fixed inset-0 z-30 overflow-y-scroll"
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="pointer-events-auto fixed inset-0 bg-slate-600 bg-opacity-40 backdrop-blur-sm" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className="
                mt-20 inline-block w-full max-w-xl transform overflow-hidden
                rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-slate-900
                dark:text-slate-100
              "
            >
              {children}

              <button
                className="absolute top-4 right-4 flex h-7 w-7 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
                onClick={() => onClose(false)}
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
