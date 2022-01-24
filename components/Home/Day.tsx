import { useDroppable } from "@dnd-kit/core";
import { CalendarItem } from "./CalendarItem";

interface HourProps {
  time: Date;
  showTimes: boolean;
}

interface DayProps {
  date: Date;
  tasks: any[];
  showTimes: boolean;
}

const formatDay = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
}).format;

const formatHour = new Intl.DateTimeFormat("en", {
  hour: "numeric",
}).format;

function Hour({ time, showTimes }: HourProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: time.toString(),
    data: { time },
  });

  return (
    <div
      ref={setNodeRef}
      className={
        isOver
          ? "h-12 bg-slate-200 even:border-b dark:border-slate-700"
          : "h-12 even:border-b dark:border-slate-700"
      }
    >
      {showTimes && time.getMinutes() === 0 ? (
        <small>{formatHour(time)}</small>
      ) : null}
    </div>
  );
}

export function Day({ date, tasks, showTimes }: DayProps) {
  return (
    <div className="relative dark:border-slate-700">
      <div className="bg-white dark:bg-slate-900 sticky top-0 py-2 px-1 border-b dark:border-slate-700">
        <h2 className="font-semibold">{formatDay(date)}</h2>
      </div>

      <div className="relative">
        {Array(48)
          .fill(0)
          .map((_, index) => {
            const hour = new Date(date);
            hour.setHours(0);
            hour.setMinutes(index * 30);
            return <Hour key={index} time={hour} showTimes={showTimes} />;
          })}

        {tasks.map((task: any) => (
          <div
            key={task.id}
            className="absolute left-0 w-11/12"
            style={{
              top: new Date(task.time).getHours() * 48 * 2,
              height: (task.duration / 30) * 48,
            }}
          >
            <CalendarItem id={task.id.toString()} name={task.name} />
          </div>
        ))}
      </div>
    </div>
  );
}
