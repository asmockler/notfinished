import { CheckButton } from "../CheckButton";
import { useToggleTaskCompletionMutation } from "../graphql/ToggleTaskCompletion";
import { useUpdateCalendarEventMutation } from "../graphql/UpdateCalendarEvent";
import { useUpdateTaskMutation } from "../graphql/UpdateTaskMutation";

import { ResizeHandle } from "./ResizeHandle";

interface Props {
  id: number;
  name: string;
  duration: number;
  complete?: boolean;
}

export function CalendarItem({ id, duration, name, complete = false }: Props) {
  const [toggleTaskCompletion] = useToggleTaskCompletionMutation();
  const [updateTask] = useUpdateTaskMutation({ refetchQueries: ["Home"] });
  const [updateCalendarEvent] = useUpdateCalendarEventMutation({
    refetchQueries: ["Home"],
  });

  async function handleCompleteClick() {
    try {
      await toggleTaskCompletion({
        variables: {
          input: {
            taskId: id,
            complete: !complete,
          },
        },
      });
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }

  async function handleResize(minuteDelta: number) {
    try {
      let response = null;

      if (complete == null) {
        response = await updateCalendarEvent({
          variables: {
            input: { calendarEventId: id, duration: duration + minuteDelta },
          },
        });
      } else {
        response = await updateTask({
          variables: {
            input: { taskId: id, duration: duration + minuteDelta },
          },
        });
      }
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  }

  return (
    <div className="relative">
      <div
        className="
            left-px overflow-hidden
            rounded-md border bg-gradient-to-br from-indigo-700 to-indigo-500
            px-1.5 py-[5px] text-xs text-white dark:border-slate-400
          "
        style={{ height: duration }}
      >
        <div className="flex gap-1.5">
          {complete == null ? null : (
            <CheckButton checked={complete} onClick={handleCompleteClick} />
          )}
          <p
            className={`flex-grow select-none leading-snug ${
              duration === 30 ? "overflow-hidden whitespace-nowrap" : ""
            }`}
            title={name}
          >
            {complete ? <s className="opacity-60">{name}</s> : name}
          </p>
        </div>
      </div>
      <ResizeHandle id={id} onResize={handleResize} />
    </div>
  );
}
