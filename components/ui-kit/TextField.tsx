interface Props {
  inlineButton?: boolean;
  name: string;
  onChange(value: string): void;
  placeholder?: string;
  value: string;
}

export function TextField({
  inlineButton = false,
  name,
  onChange,
  placeholder,
  value,
}: Props) {
  return (
    <div className="rounded-md border border-slate-500 flex">
      <input
        className="p-2 rounded-md bg-transparent w-full"
        name={name}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        type="text"
        value={value}
      />

      {inlineButton ? <button className="p-2">&rarr;</button> : null}
    </div>
  );
}
