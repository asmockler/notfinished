import { useDroppable } from "@dnd-kit/core";

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
        isOver ? "h-12 bg-slate-200 even:border-b" : "h-12 even:border-b"
      }
    >
      <small>
        {time.getHours()}:{time.getMinutes()}
      </small>
    </div>
  );
}

export function Day({ date, tasks }: DayProps) {
  return (
    <div className="relative">
      <div className="bg-white sticky top-0 py-2 px-1 border-b">
        <h2 className="font-semibold">{date.getDate()}</h2>
      </div>

      <div>
        {Array(48)
          .fill(0)
          .map((_, index) => {
            const hour = new Date(date);
            hour.setHours(0);
            hour.setMinutes(index * 30);
            return <Hour key={index} time={hour} />;
          })}

        {tasks.map((task: any) => (
          <div
            key={task.id}
            className="absolute h-24 bg-fuchsia-600 text-white w-10/12 rounded-md p-2 left-2"
            style={{
              top: new Date(task.time).getHours() * 48 * 2,
            }}
          >
            {task.name}
          </div>
        ))}
      </div>
    </div>
  );
}
