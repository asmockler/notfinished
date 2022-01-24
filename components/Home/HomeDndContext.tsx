import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  DragStartEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onDragEnd(event: DragEndEvent): void;
  onDragStart(event: DragStartEvent): void;
}

export function HomeDndContext({ children, onDragStart, onDragEnd }: Props) {
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 7 },
  });
  const sensors = useSensors(pointerSensor);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      {children}
    </DndContext>
  );
}
