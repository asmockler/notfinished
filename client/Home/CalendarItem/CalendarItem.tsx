import { Transition } from "@headlessui/react";
import { useState } from "react";
import { CheckButton } from "../CheckButton";
import { EditCalendarEventModal } from "../EditCalendarEventModal";
import { useToggleTaskCompletionMutation } from "../graphql/ToggleTaskCompletion";
import { useUpdateCalendarEventMutation } from "../graphql/UpdateCalendarEvent";
import { useUpdateTaskMutation } from "../graphql/UpdateTaskMutation";

import { ResizeHandle } from "./ResizeHandle";

interface Props {
  calendarEvent: {
    id: number;
    duration: number;
    time: Date;
    name: string;
    complete?: boolean | null;
  };
}

export function CalendarItem({ calendarEvent }: Props) {
  const [toggleTaskCompletion] = useToggleTaskCompletionMutation();
  const [updateTask] = useUpdateTaskMutation({ refetchQueries: ["Home"] });
  const [updateCalendarEvent] = useUpdateCalendarEventMutation({
    refetchQueries: ["Home"],
  });
  const [editing, setEditing] = useState(false);

  async function handleCompleteClick() {
    try {
      await toggleTaskCompletion({
        variables: {
          input: {
            taskId: calendarEvent.id,
            complete: !calendarEvent.complete,
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

      if (calendarEvent.complete == null) {
        response = await updateCalendarEvent({
          variables: {
            input: {
              calendarEventId: calendarEvent.id,
              duration: calendarEvent.duration + minuteDelta,
            },
          },
        });
      } else {
        response = await updateTask({
          variables: {
            input: {
              taskId: calendarEvent.id,
              duration: calendarEvent.duration + minuteDelta,
            },
          },
        });
      }
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  }

  return (
    <div className="relative" onClick={() => setEditing(!editing)}>
      <div
        className="
            left-px overflow-hidden
            rounded-md border bg-gradient-to-br from-indigo-700 to-indigo-500
            px-1.5 py-[5px] text-xs text-white dark:border-slate-400
          "
        style={{ height: calendarEvent.duration }}
      >
        <div className="flex gap-1.5">
          {calendarEvent.complete == null ? null : (
            <CheckButton
              checked={calendarEvent.complete}
              onClick={handleCompleteClick}
            />
          )}
          <p
            className={`flex-grow select-none leading-snug ${
              calendarEvent.duration === 30
                ? "overflow-hidden whitespace-nowrap"
                : ""
            }`}
            title={calendarEvent.name}
          >
            {calendarEvent.complete ? (
              <s className="opacity-60">{calendarEvent.name}</s>
            ) : (
              calendarEvent.name
            )}
          </p>
        </div>
      </div>
      <ResizeHandle id={calendarEvent.id} onResize={handleResize} />

      <Transition show={editing} unmount>
        <EditCalendarEventModal
          open={editing}
          calendarEvent={calendarEvent}
          onClose={() => setEditing(false)}
        />
      </Transition>
    </div>
  );
}
