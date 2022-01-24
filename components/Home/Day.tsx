import { useDroppable } from "@dnd-kit/core";
import classnames from "classnames";
import { isToday } from "date-fns";

import { CalendarItem } from "./CalendarItem";
import { NowIndicator } from "./NowIndicator";

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
  const classes = classnames(
    "h-[30px] dark:border-slate-700",
    time.getHours() !== 23 && "even:border-b",
    isOver && "bg-slate-200 dark:bg-slate-800"
  );

  return <div ref={setNodeRef} className={classes} />;
}

export function Day({ date, tasks }: DayProps) {
  return (
    <div className="relative dark:border-slate-700">
      {isToday(date) ? <NowIndicator /> : null}

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
