import * as Dialog from "@radix-ui/react-dialog";
import { XIcon } from "@heroicons/react/solid";
import { FormEvent, useState } from "react";
import { addMinutes, startOfDay } from "date-fns";
import { Button, Option, Select, TextField } from "../ui-kit";
import { useCreateCalendarEventMutation } from "./graphql/CreateCalendarEventMutation";

interface Props {
  open: boolean;
  onOpenChange(open: boolean): void;
  suggestedTime: Date;
}

const formatHour = new Intl.DateTimeFormat("en", {
  hour: "numeric",
  minute: "2-digit",
}).format;

export function NewCalendarEventModal({
  open,
  onOpenChange,
  suggestedTime,
}: Props) {
  const [createCalendarEvent] = useCreateCalendarEventMutation({
    refetchQueries: ["Home"],
  });
  const [time, setTime] = useState(suggestedTime.toISOString());
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("30");

  const startOfClickedDay = startOfDay(suggestedTime);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await createCalendarEvent({
        variables: {
          input: {
            userId: 1,
            duration: Number(duration),
            name,
            time,
          },
        },
      });

      onOpenChange(false);
    } catch (error) {
      console.error(JSON.stringify(error), null, 2);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 bg-slate-700 bg-opacity-40" />
        <Dialog.Content
          className="
            fixed top-1/3 left-1/2 z-20 w-11/12 max-w-lg -translate-x-1/2 -translate-y-1/2
            rounded-lg bg-white p-5 shadow-md focus:outline-none dark:bg-slate-900
            dark:text-slate-50
          "
        >
          <Dialog.Title className="text-xl font-semibold">
            New Calendar Event
          </Dialog.Title>

          <Dialog.Description className="pt-0.5 pb-3 text-slate-500 dark:text-slate-400">
            Create a new calendar event
          </Dialog.Description>

          <form
            method="post"
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <TextField
              label="Event name"
              name="Event name"
              onChange={setName}
              placeholder="Event name"
              value={name}
            />

            <Select onChange={setTime} value={time} label="Start time">
              {Array(48)
                .fill(0)
                .map((_, index) => {
                  const time = addMinutes(startOfClickedDay, index * 30);
                  const timeString = time.toISOString();

                  return (
                    <Option key={timeString} value={timeString}>
                      {formatHour(time)}
                    </Option>
                  );
                })}
            </Select>

            <Select onChange={setDuration} value={duration} label="Duration">
              <Option value="30">30 minutes</Option>
              <Option value="60">1 hour</Option>
              <Option value="90">1.5 hours</Option>
              <Option value="120">2 hours</Option>
              <Option value="150">2.5 hours</Option>
            </Select>

            <div className="flex justify-end">
              <Button type="submit" variant="primary">
                Save
              </Button>
            </div>
          </form>

          <Dialog.Close className="absolute top-4 right-4 flex h-7 w-7 items-center justify-center rounded-full hover:bg-slate-100">
            <XIcon className="h-4 w-4" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
