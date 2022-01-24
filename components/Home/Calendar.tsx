import { useState } from "react";
import { isToday, startOfWeek, subWeeks, addWeeks } from "date-fns";
import { Day } from "./Day";

interface Props {
  tasks: any[];
}

const formatDateWithShortMonth = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
}).format;

const formatDateWithMonth = new Intl.DateTimeFormat("en", {
  month: "long",
  day: "numeric",
}).format;

const formatDateWithoutMonth = new Intl.DateTimeFormat("en", {
  day: "numeric",
}).format;

const formatHour = new Intl.DateTimeFormat("en", {
  hour: "numeric",
}).format;

export function Calendar({ tasks }: Props) {
  const [firstDate, setFirstDate] = useState(startOfWeek(new Date()));

  const lastDate = new Date(firstDate);
  lastDate.setDate(lastDate.getDate() + 6);

  return (
    <div className="h-screen grid grid-rows-[min-content_1fr]">
      <div className="flex justify-between items-center">
        <div className="p-2 text-3xl font-bold">
          {formatDateWithMonth(firstDate)} &ndash;{" "}
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
            onClick={() => setFirstDate(startOfWeek(new Date()))}
          >
            Today
          </button>
          <button
            onClick={() => {
              setFirstDate(subWeeks(firstDate, 1));
            }}
          >
            &larr;
          </button>
          <button
            onClick={() => {
              setFirstDate(addWeeks(firstDate, 1));
            }}
          >
            &rarr;
          </button>
        </div>
      </div>

      <div
        className="
          flex-grow
          grid grid-cols-[min-content_1fr] grid-rows-[min-content_1fr]
          overflow-y-scroll
        "
      >
        {/* This is an empty node at the top-left corner of the calendar */}
        <div className="sticky top-0 bg-white dark:bg-slate-900" />

        <div className="bg-white dark:bg-slate-900 sticky top-0 grid grid-cols-7 z-10 border-b dark:border-b-slate-500">
          {Array(7)
            .fill(0)
            .map((_, index) => {
              const date = new Date(firstDate);
              date.setDate(date.getDate() + index);

              return (
                <div key={index}>
                  <h2
                    className={
                      isToday(date)
                        ? "py-2 px-1 font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-800 via-purple-600 to-pink-500 inline-block"
                        : "py-2 px-1 font-semibold"
                    }
                  >
                    {formatDateWithShortMonth(date)}
                  </h2>
                </div>
              );
            })}
        </div>
        <div>
          {Array(24)
            .fill(0)
            .map((_, index) => {
              const time = new Date();
              time.setHours(index);
              return (
                <p
                  key={index}
                  className="h-[60px] pl-2 pr-3 whitespace-nowrap text-xs text-right text-slate-500"
                >
                  {formatHour(time)}
                </p>
              );
            })}
        </div>
        <div className="grid grid-cols-7 divide-x">
          {Array(7)
            .fill(0)
            .map((_, index) => {
              const date = new Date(firstDate);
              date.setDate(date.getDate() + index);
              const tasksOnDate = tasks.filter((task: any) => {
                return new Date(task.time).getDate() === date.getDate();
              });

              return <Day key={index} date={date} tasks={tasksOnDate} />;
            })}
        </div>
      </div>
    </div>
  );
}
