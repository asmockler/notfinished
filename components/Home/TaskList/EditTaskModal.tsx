import * as Dialog from "@radix-ui/react-dialog";
import { XIcon } from "@heroicons/react/solid";
import { ReactNode, useState } from "react";
import { Button, TextField } from "../../ui-kit";
import type { TaskListTask } from "./types";

interface Props {
  task: TaskListTask;
  trigger: ReactNode;
}

export function EditTaskModal({ task, trigger }: Props) {
  const [taskName, setTaskName] = useState(task.name);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-slate-600 fixed inset-0 z-[21474836471] bg-opacity-70" />

        <Dialog.Content
          className="
              fixed z-[21474836471] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              bg-white dark:bg-slate-900 dark:text-white rounded-lg p-4 shadow-md w-full max-w-lg
            "
        >
          <Dialog.Title className="text-xl font-semibold">
            Edit Task
          </Dialog.Title>

          <form method="post" className="flex gap-2 flex-col">
            <TextField
              name="name"
              onChange={setTaskName}
              value={taskName}
              placeholder="Task name"
            />

            <div>
              <Button>Save</Button>
            </div>
          </form>

          <Dialog.Close>
            <XIcon className="h-5 w-5 font-white absolute top-3 right-3" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
