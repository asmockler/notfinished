import classnames from "classnames";
import { DragOverlay, useDroppable } from "@dnd-kit/core";
import { useToggleTaskCompletionMutation } from "./graphql/ToggleTaskCompletion";
import { Draggable } from "./Draggable";

interface Task {
  id: number;
  name: string;
  complete: boolean;
}

interface Props {
  tasks: any;
  activeTaskId: string | null;
}

function Task({ task }: { task: Task }) {
  const [mutate] = useToggleTaskCompletionMutation();

  async function handleCompleteClick() {
    try {
      await mutate({
        variables: {
          input: {
            taskId: task.id,
            complete: !task.complete,
          },
        },
      });
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }

  return (
    <div className="bg-gradient-to-br from-blue-600 to-sky-400 dark:from-blue-800 dark:to-sky-600 text-white rounded-md px-2 py-1 text-sm flex items-center gap-2">
      <button
        className="w-4 h-4 rounded-full border hover:bg-white hover:bg-opacity-40"
        onClick={handleCompleteClick}
      />
      <p className="flex-grow select-none">
        {task.complete ? <s className="opacity-60">{task.name}</s> : task.name}
      </p>
    </div>
  );
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
      : tasks.find((task: Task) => task.id.toString() === activeTaskId);

  return (
    <>
      <div className="px-2 h-full">
        <div className={classes} ref={setNodeRef}>
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
      </div>

      <DragOverlay>
        {activeTask == null ? null : <Task task={activeTask} />}
      </DragOverlay>
    </>
  );
}
