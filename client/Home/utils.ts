import { addMinutes } from "date-fns";

interface SchedulableArgs {
  duration: number;
  id: number;
  name: string;
  time: string;
}

interface ScheduledEventArgs extends SchedulableArgs {}

interface ScheduledTaskArgs extends ScheduledEventArgs {
  complete: boolean;
}

export class Schedulable {
  duration: number;
  endTime: Date;
  id: number;
  name: string;
  startTime: Date;
  time: Date;

  widthAdjustments = 0;
  leftAdjustments = 0;

  constructor({ time, duration, id, name }: SchedulableArgs) {
    this.startTime = new Date(time);
    this.time = this.startTime;
    this.endTime = addMinutes(this.startTime, duration);
    this.duration = duration;
    this.id = id;
    this.name = name;
  }
}

export class ScheduledEvent extends Schedulable {}

export class ScheduledTask extends Schedulable {
  complete: boolean;

  constructor({ complete, duration, id, name, time }: ScheduledTaskArgs) {
    super({ time, duration, id, name });
    this.complete = complete;
  }
}
