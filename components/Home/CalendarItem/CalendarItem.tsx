import { CheckButton } from "../CheckButton";
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
          relative left-px rounded-md
          border bg-gradient-to-br from-indigo-700 to-indigo-500 px-1.5
          py-[5px] text-xs text-white
        "
      style={{ height: duration }}
    >
      <div className="flex items-center gap-1.5">
        <CheckButton checked={complete} onClick={handleCompleteClick} />

        <p
          className="flex-grow select-none overflow-hidden overflow-ellipsis whitespace-nowrap"
          title={name}
        >
          {complete ? <s className="opacity-60">{name}</s> : name}
        </p>
      </div>

      <ResizeHandle id={id} onResize={handleResize} />
    </div>
  );
}
