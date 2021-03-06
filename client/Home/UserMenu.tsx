import { Menu, Transition } from "@headlessui/react";
import { LogoutIcon } from "@heroicons/react/solid";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { Fragment } from "react";

interface Props {
  email: string;
  imgSrc: string;
}

export function UserMenu({ email, imgSrc }: Props) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button>
        <Image
          src={imgSrc}
          alt=""
          width={35}
          height={35}
          className="rounded-full"
        />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="
            absolute right-0 -top-[120%] w-56 rounded-lg
            bg-white shadow-lg dark:bg-slate-800
          "
        >
          <div className="p-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`
                    ${active ? "bg-slate-100 dark:bg-slate-700" : ""}
                    flex w-full items-center rounded-md p-2 text-sm
                  `}
                  onClick={() => signOut()}
                >
                  <LogoutIcon className="mr-2 h-5 w-5" /> Log out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
