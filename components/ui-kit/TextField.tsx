import { InputHTMLAttributes } from "react";

interface Props {
  autoComplete?: InputHTMLAttributes<HTMLInputElement>["autoComplete"];
  inlineButton?: boolean;
  name: string;
  onChange(value: string): void;
  placeholder?: string;
  value: string;
}

export function TextField({
  autoComplete = "off",
  inlineButton = false,
  name,
  onChange,
  placeholder,
  value,
}: Props) {
  return (
    <div className="flex rounded-md border border-slate-500 dark:border-slate-200">
      <input
        autoComplete={autoComplete}
        className="w-full rounded-md bg-transparent p-2"
        name={name}
        placeholder={placeholder}
        onChange={(event) => onChange(event.currentTarget.value)}
        type="text"
        value={value}
      />

      {inlineButton ? <button className="p-2">&rarr;</button> : null}
    </div>
  );
}
