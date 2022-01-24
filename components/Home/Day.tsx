import { useDroppable } from "@dnd-kit/core";
import { CalendarItem } from "./CalendarItem";

interface HourProps {
  time: Date;
}

interface DayProps {
  date: Date;
  tasks: any[];
}

function Hour({ time }: HourProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: time.toString(),
    data: { time },
  });

  return (
    <div
      ref={setNodeRef}
      className={
        isOver
          ? "h-[30px] bg-slate-200 even:border-b dark:border-slate-700"
          : "h-[30px] even:border-b dark:border-slate-700"
      }
    />
  );
}

export function Day({ date, tasks }: DayProps) {
  return (
    <div className="relative dark:border-slate-700">
      <div className="relative">
        {Array(48)
          .fill(0)
          .map((_, index) => {
            const hour = new Date(date);
            hour.setHours(0);
            hour.setMinutes(index * 30);
            return <Hour key={index} time={hour} />;
          })}

        {tasks.map((task: any) => {
          const taskTime = new Date(task.time);

          return (
            <div
              key={task.id}
              className="absolute left-0 w-11/12"
              style={{
                top: taskTime.getHours() * 60 + taskTime.getMinutes(),
              }}
            >
              <CalendarItem
                id={task.id.toString()}
                name={task.name}
                duration={task.duration}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
