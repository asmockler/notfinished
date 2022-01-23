import { useState } from "react";
import { Day } from "./components";

interface Props {
  tasks: any[];
}

export function Calendar({ tasks }: Props) {
  const [firstDate, setFirstDate] = useState(new Date());

  return (
    <div className="h-screen grid grid-rows-[min-content_1fr]">
      <div className="flex justify-between items-center">
        <div className="p-2 text-3xl font-semibold">
          {new Intl.DateTimeFormat("en", { month: "long" }).format(firstDate)}
        </div>

        <div className="pr-2">
          <button
            className="px-2"
            onClick={() => {
              const newDate = new Date(firstDate);
              newDate.setDate(newDate.getDate() - 1);
              setFirstDate(newDate);
            }}
          >
            &larr;
          </button>
          <button
            className="px-2"
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
            return <Day key={index} date={date} tasks={tasksOnDate} />;
          })}
      </div>
    </div>
  );
}
