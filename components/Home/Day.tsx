import { useDroppable } from "@dnd-kit/core";
import classnames from "classnames";
import { isToday, areIntervalsOverlapping, addMinutes } from "date-fns";

import { Draggable } from "./Draggable";
import { CalendarItem } from "./CalendarItem";
import { NowIndicator } from "./NowIndicator";

interface HourProps {
  time: Date;
}

interface DayProps {
  date: Date;
  tasks: any[];
}

class TaskUtil {
  startTime: Date;
  endTime: Date;
  duration: number;
  id: number;
  name: string;
  complete: boolean;

  widthAdjustments = 0;
  leftAdjustments = 0;

  constructor(task: {
    duration: number;
    time: string;
    id: number;
    name: string;
    complete: boolean;
  }) {
    this.startTime = new Date(task.time);
    this.endTime = addMinutes(this.startTime, task.duration);
    this.duration = task.duration;
    this.id = task.id;
    this.name = task.name;
    this.complete = task.complete;
  }
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
  const sortedTasks = tasks
    .map((task) => new TaskUtil(task))
    .sort((task, otherTask) => {
      return task.startTime.valueOf() - otherTask.startTime.valueOf();
    });

  for (let i = 0; i < sortedTasks.length; i++) {
    const task = sortedTasks[i];

    for (let j = i + 1; j < sortedTasks.length; j++) {
      const otherTask = sortedTasks[j];

      if (otherTask.startTime < task.endTime) {
        task.widthAdjustments += 1;
        otherTask.widthAdjustments += 1;
        otherTask.leftAdjustments += 1;
      }
    }
  }

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

        {sortedTasks.map((task) => {
          return (
            <div
              key={task.id}
              className="absolute"
              style={{
                top:
                  task.startTime.getHours() * 60 + task.startTime.getMinutes(),
                left: task.leftAdjustments * 30,
                zIndex: task.leftAdjustments,
                width: `calc(95% - ${task.widthAdjustments * 30}px)`,
              }}
            >
              <Draggable id={task.id.toString()}>
                <CalendarItem
                  id={task.id}
                  name={task.name}
                  duration={task.duration}
                  complete={task.complete}
                />
              </Draggable>
            </div>
          );
        })}
      </div>
    </div>
  );
}
