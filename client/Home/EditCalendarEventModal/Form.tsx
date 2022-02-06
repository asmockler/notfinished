import { addMinutes, startOfDay } from "date-fns";
import { FormEvent, useState } from "react";
import { useFormatDate } from "../../lib/use-format-date";

import { Button, Option, Select, TextField } from "../../ui-kit";
import { useUpdateCalendarEventMutation } from "../graphql/UpdateCalendarEvent";

interface Props {
  calendarEvent: {
    id: number;
    duration: number;
    name: string;
    time: Date;
  };
  onSubmit(): void;
}

export function Form({ calendarEvent, onSubmit }: Props) {
  const formatHour = useFormatDate({ hour: "numeric", minute: "2-digit" });
  const [updateCalendarEvent] = useUpdateCalendarEventMutation({
    refetchQueries: ["Home"],
  });
  const [time, setTime] = useState(calendarEvent.time.toISOString());
  const [name, setName] = useState(calendarEvent.name);
  const [duration, setDuration] = useState(calendarEvent.duration.toString());

  const startOfEventDay = startOfDay(calendarEvent.time);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await updateCalendarEvent({
        variables: {
          input: {
            calendarEventId: 1,
            time,
            name,
            duration: Number(duration),
          },
        },
      });

      onSubmit();
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  }

  return (
    <form method="post" className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
            const time = addMinutes(startOfEventDay, index * 30);
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
  );
}
