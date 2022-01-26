import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function Button({ children }: Props) {
  return (
    <button
      className="
        rounded-lg bg-emerald-200 py-2 px-4
        text-sm font-semibold leading-5 text-emerald-900 dark:bg-emerald-600 dark:text-white
      "
    >
      {children}
    </button>
  );
}

// bg-gradient-to-br from-emerald-500 to-green-500

{
  /* <button class="h-10 px-6 font-semibold rounded-md bg-black text-white" type="submit">
          Buy now
        </button> */
}
