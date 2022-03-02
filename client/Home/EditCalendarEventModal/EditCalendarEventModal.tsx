import { DialogContainer, DialogDescription, DialogTitle } from "../../ui-kit";
import { Form } from "./Form";

interface Props {
  open: boolean;
  onClose(): void;
  calendarEvent: {
    id: number;
    duration: number;
    time: Date;
    name: string;
  };
}

export function EditCalendarEventModal({
  open,
  onClose,
  calendarEvent,
}: Props) {
  return (
    <DialogContainer open={open} onClose={onClose}>
      <DialogTitle>Edit Calendar Event</DialogTitle>

      <DialogDescription>Edit a calendar event</DialogDescription>

      {calendarEvent == null ? null : (
        <Form calendarEvent={calendarEvent} onSubmit={() => onClose()} />
      )}
    </DialogContainer>
  );
}
