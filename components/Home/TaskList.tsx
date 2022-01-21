import { DragOverlay } from "@dnd-kit/core";
import { Draggable } from "./Draggable";

interface Task {
  id: number;
  name: string;
}

interface Props {
  tasks: any;
  activeTaskId: string | null;
}

function Task({ task }: { task: Task }) {
  return (
    <div className="bg-blue-600 text-white rounded-md px-3 py-1">
      {task.name}
    </div>
  );
}

export function TaskList({ tasks, activeTaskId }: Props) {
  const activeTask =
    activeTaskId == null
      ? null
      : tasks.find((task: Task) => task.id.toString() === activeTaskId);

  return (
    <>
      <div className="flex flex-col gap-y-2">
        {tasks.map((task: Task) => {
          if (task.id.toString() === activeTaskId) {
            return null;
          }
          return (
            <Draggable key={task.id} id={task.id.toString()}>
              <Task task={task} />
            </Draggable>
          );
        })}
      </div>

      <DragOverlay>
        {activeTask == null ? null : <Task task={activeTask} />}
      </DragOverlay>
    </>
  );
}
