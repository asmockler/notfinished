import { addWeeks, startOfWeek, subWeeks } from "date-fns";
import { ReactNode } from "react";

interface Props {
  currentDate: Date;
  onDateNavigation(newDate: Date): void;
}

interface ButtonProps {
  children: ReactNode;
  onClick(): void;
}

function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      className="
        rounded-lg bg-slate-100 px-3 py-1 hover:bg-slate-200
        dark:bg-slate-800 dark:hover:bg-slate-700
      "
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function CalendarActions({ currentDate, onDateNavigation }: Props) {
  return (
    <nav className="flex gap-3">
      <Button
        onClick={() => {
          onDateNavigation(subWeeks(currentDate, 1));
        }}
      >
        &larr;
      </Button>

      <Button onClick={() => onDateNavigation(startOfWeek(new Date()))}>
        Today
      </Button>

      <Button
        onClick={() => {
          onDateNavigation(addWeeks(currentDate, 1));
        }}
      >
        &rarr;
      </Button>
    </nav>
  );
}
