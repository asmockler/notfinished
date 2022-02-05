import { LabelHTMLAttributes, ReactNode } from "react";

interface Props {
  children: ReactNode;
  htmlFor: LabelHTMLAttributes<HTMLLabelElement>["htmlFor"];
}

export function Label({ children, htmlFor }: Props) {
  return (
    <label className="block pb-1.5 text-sm font-medium" htmlFor={htmlFor}>
      {children}
    </label>
  );
}
