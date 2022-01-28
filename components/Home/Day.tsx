import { useDroppable } from "@dnd-kit/core";
import classnames from "classnames";
import { isToday, addMinutes } from "date-fns";
import { useState } from "react";

import { Draggable } from "./Draggable";
import { CalendarItem } from "./CalendarItem";
import { NowIndicator } from "./NowIndicator";
import { NewCalendarEventModal } from "./NewCalendarEventModal";
import { Schedulable, ScheduledEvent, ScheduledTask } from "./utils";

interface HourProps {
  time: Date;
  onClick(time: Date): void;
}

interface DayProps {
  date: Date;
  events: any[];
  tasks: any[];
}

function Hour({ onClick, time }: HourProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: time.toString(),
    data: { time },
  });
  const classes = classnames(
    "h-[30px] dark:border-slate-700",
    time.getHours() !== 23 && "even:border-b",
    isOver && "bg-slate-200 dark:bg-slate-800"
  );

  return (
    <div onClick={() => onClick(time)} ref={setNodeRef} className={classes} />
  );
}

export function Day({ date, events, tasks }: DayProps) {
  const [createModalTime, setCreateModalTime] = useState<Date | null>(null);
  const showCreateModal = createModalTime != null;

  const schedulables: Schedulable[] = [];
  events.forEach((event) => schedulables.push(new ScheduledEvent(event)));
  tasks.forEach((task) => schedulables.push(new ScheduledTask(task)));
  schedulables.sort((schedulable, otherSchedulable) => {
    return (
      schedulable.startTime.valueOf() - otherSchedulable.startTime.valueOf()
    );
  });

  for (let i = 0; i < schedulables.length; i++) {
    const task = schedulables[i];

    for (let j = i + 1; j < schedulables.length; j++) {
      const otherTask = schedulables[j];

      if (otherTask.startTime < task.endTime) {
        task.widthAdjustments += 1;
        otherTask.widthAdjustments += 1;
        otherTask.leftAdjustments += 1;
      }
    }
  }

  return (
    <>
      <div className="relative dark:border-slate-700">
        {isToday(date) ? <NowIndicator /> : null}

        <div className="relative">
          {Array(48)
            .fill(0)
            .map((_, index) => {
              const hour = new Date(date);
              hour.setHours(0);
              hour.setMinutes(index * 30);
              return (
                <Hour
                  key={index}
                  time={hour}
                  onClick={(time) => setCreateModalTime(time)}
                />
              );
            })}

          {schedulables.map((schedulable) => {
            return (
              <div
                key={schedulable.id}
                className="absolute"
                style={{
                  top:
                    schedulable.startTime.getHours() * 60 +
                    schedulable.startTime.getMinutes(),
                  left: schedulable.leftAdjustments * 30,
                  zIndex: schedulable.leftAdjustments,
                  width: `calc(95% - ${schedulable.widthAdjustments * 30}px)`,
                }}
              >
                <Draggable id={schedulable.id.toString()}>
                  <CalendarItem
                    id={schedulable.id}
                    name={schedulable.name}
                    duration={schedulable.duration}
                    complete={
                      schedulable instanceof ScheduledTask
                        ? schedulable.complete
                        : null
                    }
                  />
                </Draggable>
              </div>
            );
          })}
        </div>
      </div>

      <NewCalendarEventModal
        open={showCreateModal}
        suggestedTime={createModalTime}
        onClose={() => setCreateModalTime(null)}
      />
    </>
  );
}
