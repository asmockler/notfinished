import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { DotsHorizontalIcon, TrashIcon } from "@heroicons/react/outline";
import { useState } from "react";

import { useDeleteTaskMutation } from "../graphql/DeleteTaskMutation";
import type { TaskListTask } from "./types";

interface Props {
  task: TaskListTask;
}

export function Dropdown({ task }: Props) {
  const [open, setOpen] = useState(false);
  const [mutate] = useDeleteTaskMutation({ refetchQueries: ["Home"] });

  async function handleDeleteClick() {
    try {
      await mutate({ variables: { input: { taskId: task.id } } });
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  }

  return (
    <DropdownMenu.Root open={open} onOpenChange={(value) => setOpen(value)}>
      <DropdownMenu.Trigger asChild>
        <button className="rounded-md px-1 py-0.5 hover:bg-white hover:bg-opacity-20">
          <DotsHorizontalIcon className="h-3 w-3 text-white opacity-60" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="min-w-[125px] rounded-lg bg-white px-1 py-1.5 text-sm shadow-md dark:bg-slate-800 dark:text-white">
        <DropdownMenu.Item className="hover:outline-none">
          <button
            className="flex w-full items-center gap-1.5 rounded-md py-0.5 pl-1.5 pr-2 text-left text-rose-500 hover:bg-slate-100 dark:text-rose-400 dark:hover:bg-slate-700"
            onClick={handleDeleteClick}
          >
            <TrashIcon className="h-4 w-4" /> Delete Task
          </button>
        </DropdownMenu.Item>

        <DropdownMenu.Arrow
          offset={5}
          className="fill-white dark:fill-slate-800"
        />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
