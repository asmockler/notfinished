import { useToggleTaskCompletionMutation } from "../graphql/ToggleTaskCompletion";
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
      await updateTask({
        variables: { input: { taskId: id, duration: duration + minuteDelta } },
      });
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  }

  return (
    <div
      className="
          bg-gradient-to-br from-indigo-700 to-indigo-500
          text-white rounded-md px-1.5 py-1.5 text-xs
          ml-1 relative
        "
      style={{ height: duration - 2, marginTop: 1, marginBottom: 1 }}
    >
      <div className="flex items-center gap-1.5">
        <button
          className="w-4 h-4 rounded-full border hover:bg-white hover:bg-opacity-40 flex-shrink-0"
          onClick={handleCompleteClick}
        ></button>

        <p
          className="flex-grow select-none whitespace-nowrap overflow-ellipsis overflow-hidden"
          title={name}
        >
          {complete ? <s className="opacity-60">{name}</s> : name}
        </p>
      </div>

      <ResizeHandle id={id} onResize={handleResize} />
    </div>
  );
}
