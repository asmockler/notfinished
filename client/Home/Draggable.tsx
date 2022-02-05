import { useDraggable } from "@dnd-kit/core";
import { ReactNode } from "react";

interface DraggableProps {
  id: string;
  children: ReactNode;
  data?: { [key: string]: any };
}

export function Draggable({ id, children, data }: DraggableProps) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
    data,
  });

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      {children}
    </div>
  );
}
