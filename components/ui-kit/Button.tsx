import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function Button({ children }: Props) {
  return (
    <button
      className="
        bg-emerald-200 text-emerald-900 dark:text-white dark:bg-emerald-600
        text-sm leading-5 font-semibold py-2 px-4 rounded-lg
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
