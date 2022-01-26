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
            ? "border-emerald-200 bg-emerald-200 text-emerald-900 dark:border-emerald-600 dark:bg-emerald-600 dark:text-white"
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
