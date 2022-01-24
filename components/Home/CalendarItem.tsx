import { Draggable } from "./Draggable";
import { useToggleTaskCompletionMutation } from "./graphql/ToggleTaskCompletion";

interface Props {
  id: number;
  name: string;
  duration: number;
  complete?: boolean;
}

export function CalendarItem({ id, duration, name, complete = false }: Props) {
  const [mutate] = useToggleTaskCompletionMutation();

  async function handleCompleteClick() {
    try {
      await mutate({
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

  return (
    <Draggable id={id.toString()}>
      <div
        className="
          bg-gradient-to-br from-indigo-700 to-indigo-500
          text-white rounded-md px-1.5 py-1 text-xs
          flex items-center gap-1 ml-1
        "
        style={{ height: duration - 2, marginTop: 1, marginBottom: 1 }}
      >
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
    </Draggable>
  );
}
