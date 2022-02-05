import { CheckIcon } from "@heroicons/react/solid";

interface Props {
  checked: boolean;
  onClick(): void;
}

export function CheckButton({ checked, onClick }: Props) {
  return (
    <button
      className="relative h-4 w-4 flex-shrink-0 rounded-full border hover:bg-white hover:bg-opacity-20"
      onClick={onClick}
    >
      {checked ? (
        <CheckIcon className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 text-white opacity-80" />
      ) : null}
    </button>
  );
}
