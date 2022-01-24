import { useState } from "react";
import { Day } from "./components";

interface Props {
  tasks: any[];
}

const formatDateWithMonth = new Intl.DateTimeFormat("en", {
  month: "long",
  day: "numeric",
}).format;

const formatDateWithoutMonth = new Intl.DateTimeFormat("en", {
  day: "numeric",
}).format;

export function Calendar({ tasks }: Props) {
  const [firstDate, setFirstDate] = useState(new Date());

  const lastDate = new Date(firstDate);
  lastDate.setDate(lastDate.getDate() + 6);

  return (
    <div className="h-screen grid grid-rows-[min-content_1fr]">
      <div className="flex justify-between items-center">
        <div className="p-2 text-3xl font-semibold">
          {formatDateWithMonth(firstDate)} –{" "}
          {firstDate.getMonth() === lastDate.getMonth()
            ? formatDateWithoutMonth(lastDate)
            : formatDateWithMonth(lastDate)}
        </div>

        <div className="pr-2 flex gap-6">
          <button
            className="
              bg-slate-100 hover:bg-slate-200 rounded-md px-3 py-1
              dark:bg-slate-800 dark:hover:bg-slate-700
            "
            onClick={() => setFirstDate(new Date())}
          >
            Today
          </button>
          <button
            onClick={() => {
              const newDate = new Date(firstDate);
              newDate.setDate(newDate.getDate() - 1);
              setFirstDate(newDate);
            }}
          >
            &larr;
          </button>
          <button
            onClick={() => {
              const newDate = new Date(firstDate);
              newDate.setDate(newDate.getDate() + 1);
              setFirstDate(newDate);
            }}
          >
            &rarr;
          </button>
        </div>
      </div>

      <div className="grid-cols-7 grid overflow-y-scroll divide-x">
        {Array(7)
          .fill(0)
          .map((_, index) => {
            const date = new Date(firstDate);
            date.setDate(date.getDate() + index);
            const tasksOnDate = tasks.filter((task: any) => {
              return new Date(task.time).getDate() === date.getDate();
            });
            return (
              <Day
                key={index}
                date={date}
                tasks={tasksOnDate}
                showTimes={index === 0}
              />
            );
          })}
      </div>
    </div>
  );
}
