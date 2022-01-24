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
        bg-slate-100 hover:bg-slate-200 rounded-lg px-3 py-1
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
