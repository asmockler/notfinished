import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick?(): void;
  type: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  variant: "primary" | "secondary";
}

export function Button({ children, onClick, variant = "primary" }: Props) {
  return (
    <button
      className={`
        rounded-lg border py-2 px-4
        font-medium leading-6
        ${
          variant === "primary"
            ? `border-indigo-200 bg-indigo-200 text-indigo-900 dark:border-indigo-300 dark:bg-indigo-300 dark:text-slate-900`
            : ""
        }
        ${
          variant === "secondary"
            ? "border-slate-200 bg-slate-200 text-slate-900 dark:border-slate-600 dark:bg-slate-600 dark:text-white"
            : ""
        }
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
