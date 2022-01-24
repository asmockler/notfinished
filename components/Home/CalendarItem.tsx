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
        className="bg-indigo-700 text-white rounded-lg px-2 py-1 text-xs"
        style={{ height: duration - 2, marginTop: 1, marginBottom: 1 }}
      >
        {name}
      </div>
    </Draggable>
  );
}
