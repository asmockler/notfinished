import { useDraggable } from "@dnd-kit/core";
import { ReactNode } from "react";

interface DraggableProps {
  id: string;
  children: ReactNode;
}

export function Draggable({ id, children }: DraggableProps) {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      {children}
    </div>
  );
}
