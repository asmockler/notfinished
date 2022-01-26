import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { DndContext, DragEndEvent, useDraggable } from "@dnd-kit/core";

// A buffer, in pixels, for when the handle should jump to
// the next 30 minute increment.
const STEP_BUFFER = 10;

interface Props {
  id: number;
  onResize(minuteDelta: number): void;
}

export function ResizeHandle({ id, onResize }: Props) {
  async function handleDragEnd(event: DragEndEvent) {
    const { initial, translated } = event.active.rect.current;

    if (initial == null || translated == null) {
      return;
    }

    const dragLength = translated.bottom - initial.bottom;
    const thirtyMinuteChunk = Math.ceil(dragLength / 30) * 30;

    onResize(thirtyMinuteChunk);
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <DragHandle id={`handle-${id.toString()}`} />
    </DndContext>
  );
}

function DragHandle({ id }: { id: string }) {
  const { isDragging, listeners, transform, setNodeRef } = useDraggable({
    id,
  });

  return (
    <div
      className="
        absolute left-0 bottom-0 flex h-2 w-full
        cursor-row-resize items-center justify-center
      bg-slate-800 bg-opacity-30 opacity-0 hover:rounded-b-md hover:bg-opacity-30
        hover:opacity-100 active:bg-opacity-30
        active:opacity-100 dark:bg-white
      "
      {...listeners}
      ref={setNodeRef}
    >
      <DotsHorizontalIcon className="h-3 w-3 opacity-70 dark:opacity-50" />

      {isDragging ? (
        <div
          className="
            pointer-events-none absolute top-full w-full rounded-b-md
            bg-slate-800 bg-opacity-30 dark:bg-white
          "
          style={{
            height:
              transform == null
                ? 0
                : Math.ceil((transform.y - STEP_BUFFER) / 30) * 30,
          }}
        />
      ) : null}
    </div>
  );
}
