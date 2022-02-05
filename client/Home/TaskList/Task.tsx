import { useState } from "react";
import { CheckButton } from "../CheckButton";
import { useToggleTaskCompletionMutation } from "../graphql/ToggleTaskCompletion";
import { Dropdown } from "./Dropdown";
import type { TaskListTask } from "./types";

interface Props {
  task: TaskListTask;
}

export function Task({ task }: Props) {
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
    <div className="flex gap-2 rounded-lg bg-gradient-to-br from-blue-600 to-sky-400 px-2 py-1.5 text-sm text-white dark:from-blue-800 dark:to-sky-600">
      <div className="-mb-0.5 pt-0.5">
        <CheckButton checked={task.complete} onClick={handleCompleteClick} />
      </div>

      <p className="flex-grow select-none text-left leading-snug">
        {task.complete ? <s className="opacity-60">{task.name}</s> : task.name}
      </p>

      <div>
        <Dropdown task={task} />
      </div>
    </div>
  );
}
