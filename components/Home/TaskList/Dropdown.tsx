import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  DotsHorizontalIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/outline";
import { useState } from "react";

import { EditTaskModal } from "./EditTaskModal";
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
        <button className="hover:bg-white hover:bg-opacity-20 px-1 py-0.5 rounded-md">
          <DotsHorizontalIcon className="w-3 h-3 text-white opacity-60" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="bg-white dark:bg-slate-800 dark:text-white shadow-md rounded-lg px-1 py-1.5 text-sm min-w-[125px]">
        <DropdownMenu.Item className="hover:outline-none">
          <button
            className="dark:hover:bg-slate-700 hover:bg-slate-100 rounded-md w-full text-left pl-1.5 pr-2 py-0.5 dark:text-red-300 text-rose-500 flex gap-1.5 items-center"
            onClick={handleDeleteClick}
          >
            <TrashIcon className="w-4 h-4" /> Delete Task
          </button>
        </DropdownMenu.Item>

        <DropdownMenu.Arrow
          offset={5}
          className="dark:fill-slate-800 fill-white"
        />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
