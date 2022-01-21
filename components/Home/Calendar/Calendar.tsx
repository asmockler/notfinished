import { Day } from "./components";

interface Props {
  tasks: any[];
}

export function Calendar({ tasks }: Props) {
  return (
    <div className="h-screen grid-cols-7 grid overflow-y-scroll divide-x">
      {Array(7)
        .fill(0)
        .map((_, index) => {
          const date = new Date();
          date.setDate(date.getDate() + index);

          const tasksOnDate = tasks.filter((task: any) => {
            return new Date(task.time).getDate() === date.getDate();
          });

          return <Day key={index} date={date} tasks={tasksOnDate} />;
        })}
    </div>
  );
}
