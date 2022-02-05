import { useEffect, useRef, useState } from "react";
import classnames from "classnames";
import {
  addDays,
  isSameDay,
  isSameMonth,
  isToday,
  startOfWeek,
} from "date-fns";
import { Day } from "./Day";
import { CalendarActions } from "./CalendarActions";

interface Props {
  tasks: any[];
  events: any[];
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

const formatDayOfWeek = new Intl.DateTimeFormat("en", { weekday: "long" })
  .format;

export function Calendar({ events, tasks }: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [firstDate, setFirstDate] = useState(startOfWeek(new Date()));

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (scrollContainer == null) {
      return;
    }

    const now = new Date();
    scrollContainer.scrollTop = now.getHours() * 60 + now.getMinutes();
  }, []);

  const visibleDates = Array(7)
    .fill(0)
    .map((_, index) => addDays(firstDate, index));
  const lastDate = visibleDates[6];

  return (
    <div className="grid h-screen grid-rows-[min-content_1fr]">
      <div className="flex items-center justify-between p-3 pb-5">
        <div className="text-3xl font-bold">
          {formatDateWithMonth(firstDate)} &ndash;{" "}
          {isSameMonth(firstDate, lastDate)
            ? formatDateWithoutMonth(lastDate)
            : formatDateWithMonth(lastDate)}
        </div>

        <CalendarActions
          currentDate={firstDate}
          onDateNavigation={(startDate) => setFirstDate(startDate)}
        />
      </div>

      <div
        ref={scrollContainerRef}
        className="
          grid
          flex-grow grid-cols-[min-content_1fr] grid-rows-[min-content_1fr]
          overflow-y-scroll
        "
      >
        {/* This is an empty node at the top-left corner of the calendar */}
        <div className="sticky top-0 bg-white dark:bg-slate-900" />

        <div
          className="
            sticky top-0 z-[11] grid
            grid-cols-7 border-b bg-white
            dark:border-b-slate-500 dark:bg-slate-900
          "
        >
          {visibleDates.map((date) => {
            const classes = classnames(
              "text-xl font-bold",
              isToday(date)
                ? "text-transparent bg-clip-text bg-gradient-to-br from-blue-800 via-purple-600 to-pink-500 inline-block dark:from-sky-400 dark:via-purple-400 dark:to-pink-600"
                : ""
            );

            return (
              <div key={date.toString()} className="px-1 pb-2">
                <p className="text-xs leading-none opacity-30">
                  {formatDayOfWeek(date)}
                </p>
                <h2 className={classes}>{formatDateWithShortMonth(date)}</h2>
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
                  className="h-[60px] whitespace-nowrap pl-2 pr-3 text-right text-xs text-slate-500"
                >
                  {formatHour(time)}
                </p>
              );
            })}
        </div>
        <div className="grid grid-cols-7 divide-x">
          {visibleDates.map((date) => {
            const tasksOnDate = tasks.filter((task: any) => {
              return isSameDay(new Date(task.time), date);
            });
            const eventsOnDate = events.filter((event: any) => {
              return isSameDay(new Date(event.time), date);
            });

            return (
              <Day
                key={date.toString()}
                date={date}
                tasks={tasksOnDate}
                events={eventsOnDate}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
