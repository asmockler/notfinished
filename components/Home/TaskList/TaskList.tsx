import classnames from "classnames";
import { DragOverlay, useDroppable } from "@dnd-kit/core";

import { Draggable } from "../Draggable";
import { Task } from "./Task";
import type { TaskListTask } from "./types";

interface Props {
  tasks: TaskListTask[];
  activeTaskId: string | null;
}

export function TaskList({ tasks, activeTaskId }: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id: "TASK_LIST",
  });

  const classes = classnames(
    "flex flex-col gap-y-2 p-2 h-full rounded-lg",
    isOver && "bg-slate-100 dark:bg-slate-800"
  );

  const activeTask =
    activeTaskId == null
      ? null
      : tasks.find((task) => task.id.toString() === activeTaskId);

  return (
    <>
      <div className="h-full px-2">
        <div className={classes} ref={setNodeRef}>
          {tasks.map((task) => {
            return (
              <Draggable
                key={task.id}
                id={task.id.toString()}
                data={{
                  type: "TASK",
                }}
              >
                <div
                  style={{
                    display:
                      task.id.toString() === activeTaskId ? "none" : undefined,
                  }}
                >
                  <Task task={task} />
                </div>
              </Draggable>
            );
          })}
        </div>
      </div>

      <DragOverlay>
        {activeTask == null ? null : <Task task={activeTask} />}
      </DragOverlay>
    </>
  );
}
