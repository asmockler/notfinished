import { OptionHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";
import { Label } from "./Label";
import { useId } from "./use-id";

interface SelectProps {
  children: ReactNode;
  label?: string;
  onChange(value: string): void;
  value: SelectHTMLAttributes<HTMLSelectElement>["value"];
}

interface OptionProps {
  children: ReactNode;
  value: OptionHTMLAttributes<HTMLOptionElement>["value"];
}

export function Option({ children, value }: OptionProps) {
  return <option value={value}>{children}</option>;
}

/* Additional styles come from global.css */
export function Select({ children, label, onChange, value }: SelectProps) {
  const id = useId();

  return (
    <div>
      {label == null ? null : <Label htmlFor={id}>{label}</Label>}

      <select
        className="block w-full appearance-none rounded-md border border-slate-500 bg-inherit px-3 py-2"
        onChange={(event) => {
          onChange(event.target.value);
        }}
        value={value}
        id={id}
      >
        {children}
      </select>
    </div>
  );
}
