import { FormEvent, useEffect, useState } from "react";
import { addMinutes, startOfDay } from "date-fns";
import {
  Button,
  DialogContainer,
  DialogDescription,
  DialogTitle,
  Option,
  Select,
  TextField,
} from "../ui-kit";
import { useCreateCalendarEventMutation } from "./graphql/CreateCalendarEventMutation";
import { useFormatDate } from "../lib/use-format-date";

interface Props {
  open: boolean;
  onClose(): void;
  suggestedTime: Date | null;
}

export function NewCalendarEventModal({ open, onClose, suggestedTime }: Props) {
  const formatHour = useFormatDate({
    hour: "numeric",
    minute: "2-digit",
  });
  const [createCalendarEvent] = useCreateCalendarEventMutation({
    refetchQueries: ["Home"],
  });
  const [time, setTime] = useState(
    suggestedTime == null
      ? new Date().toISOString()
      : suggestedTime.toISOString()
  );
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("30");

  const startOfClickedDay = startOfDay(new Date(time));

  useEffect(() => {
    if (suggestedTime == null) {
      return;
    }

    setTime(suggestedTime.toISOString());
  }, [suggestedTime]);

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

      onClose();
    } catch (error) {
      console.error(JSON.stringify(error), null, 2);
    }
  }

  return (
    <DialogContainer open={open} onClose={onClose}>
      <DialogTitle>New Calendar Event</DialogTitle>

      <DialogDescription>Create a new calendar event</DialogDescription>

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
    </DialogContainer>
  );
}
