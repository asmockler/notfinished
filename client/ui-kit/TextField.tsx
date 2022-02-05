import { InputHTMLAttributes } from "react";
import { Label } from "./Label";
import { useId } from "./use-id";

interface Props {
  autoComplete?: InputHTMLAttributes<HTMLInputElement>["autoComplete"];
  inlineButton?: boolean;
  label?: string;
  name: string;
  onChange(value: string): void;
  placeholder?: string;
  value: string;
}

export function TextField({
  autoComplete = "off",
  inlineButton = false,
  label,
  name,
  onChange,
  placeholder,
  value,
}: Props) {
  const id = useId();

  return (
    <div>
      {label == null ? null : <Label htmlFor={id}>{label}</Label>}

      <div className="flex rounded-md border border-slate-500">
        <input
          autoComplete={autoComplete}
          className="w-full rounded-md bg-transparent px-3 py-2"
          id={id}
          name={name}
          placeholder={placeholder}
          onChange={(event) => onChange(event.currentTarget.value)}
          type="text"
          value={value}
        />

        {inlineButton ? <button className="p-2">&rarr;</button> : null}
      </div>
    </div>
  );
}
