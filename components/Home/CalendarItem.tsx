import { Draggable } from "./Draggable";

interface Props {
  id: string;
  name: string;
}

export function CalendarItem({ id, name }: Props) {
  return (
    <Draggable id={id}>
      <div className="bg-indigo-700 text-white rounded-lg p-2">{name}</div>
    </Draggable>
  );
}
