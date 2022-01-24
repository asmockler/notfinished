import { Draggable } from "./Draggable";

interface Props {
  id: string;
  name: string;
  duration: number;
}

export function CalendarItem({ id, duration, name }: Props) {
  return (
    <Draggable id={id}>
      <div
        className="
        bg-gradient-to-br from-indigo-700 to-indigo-500
        text-white rounded-lg px-2 py-1 text-xs
        whitespace-nowrap overflow-ellipsis overflow-hidden
        "
        style={{ height: duration - 2, marginTop: 1, marginBottom: 1 }}
      >
        {name}
      </div>
    </Draggable>
  );
}
