import { CheckIcon } from "@heroicons/react/solid";

interface Props {
  checked: boolean;
  onClick(): void;
}

export function CheckButton({ checked, onClick }: Props) {
  return (
    <button
      className="w-4 h-4 rounded-full border hover:bg-white hover:bg-opacity-20 flex-shrink-0 relative"
      onClick={onClick}
    >
      {checked ? (
        <CheckIcon className="w-3 h-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-80" />
      ) : null}
    </button>
  );
}
