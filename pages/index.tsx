import type { NextPage } from "next";
import Router from "next/router";
import { useState } from "react";

import { Page } from "../components/ui-kit";
import { useHomeQuery } from "../components/Home/graphql/HomeQuery";
import { useUpdateTaskMutation } from "../components/Home/graphql/UpdateTaskMutation";
import { Calendar } from "../components/Home/Calendar";
import { TaskList } from "../components/Home/TaskList";
import { NewTask } from "../components/Home/NewTask";
import { HomeDndContext } from "../components/Home/HomeDndContext";
import { UserMenu } from "../components/Home/UserMenu";
import { useUpdateCalendarEventMutation } from "../components/Home/graphql/UpdateCalendarEvent";

const Home: NextPage = () => {
  const [activeDrag, setActiveDrag] = useState<string | null>(null);
  const { loading, data, refetch } = useHomeQuery();
  const [updateTask] = useUpdateTaskMutation();
  const [updateCalendarEvent] = useUpdateCalendarEventMutation();

  async function handleDragEnd(
    id: number,
    time: Date | null,
    data: { [key: string]: any }
  ) {
    try {
      let response = null;

      if (data.type === "TASK") {
        response = await updateTask({
          variables: {
            input: { taskId: id, time },
          },
        });
      } else if (data.type === "CALENDAR_EVENT") {
        response = await updateCalendarEvent({
          variables: {
            input: { calendarEventId: id, time },
          },
        });
      } else {
        throw new Error(`Unknown data type ${data.type}`);
      }

      console.log(response);
    } catch (error) {
      console.error(JSON.stringify(error, null, 2), error);
    }

    refetch();
  }

  if (loading || data == null) {
    return <p>Loading...</p>;
  }

  if (data.me == null) {
    Router.push("/api/auth/signin");

    return <p>Time to log in! Go to /api/auth/signin</p>;
  }

  return (
    <Page>
      <HomeDndContext
        onDragStart={(event) => {
          setActiveDrag(event.active.id);
        }}
        onDragEnd={(event) => {
          setActiveDrag(null);
          if (event.over == null) {
            return;
          }

          if (event.over?.id === "TASK_LIST") {
            handleDragEnd(
              Number(event.active.id),
              null,
              event.active.data.current!
            );
            return;
          }

          handleDragEnd(
            Number(event.active.id),
            event.over!.data.current!.time,
            event.active.data.current!
          );
        }}
      >
        <div className="grid grid-cols-[1fr_250px]">
          {loading ? (
            <p>Loading</p>
          ) : (
            <Calendar
              tasks={data.me.tasks.filter((task: any) => task.time != null)}
              events={data.me.calendarEvents}
            />
          )}

          <div className="grid h-screen grid-rows-[2fr_min-content] border-l dark:border-slate-700">
            <div className="flex flex-col gap-y-2 overflow-y-auto py-4">
              <h2 className="px-4 text-2xl font-semibold">Tasks</h2>

              <div className="px-4">
                <NewTask />
              </div>

              <div className="flex-grow">
                <TaskList
                  tasks={data.me.tasks.filter((task: any) => task.time == null)}
                  activeTaskId={activeDrag}
                />
              </div>
            </div>

            <div className="flex items-center justify-end border-t p-4 dark:border-slate-700">
              {data.me.image == null ? (
                <p>{data.me.email}</p>
              ) : (
                <UserMenu email={data.me.email} imgSrc={data.me.image} />
              )}
            </div>
          </div>
        </div>
      </HomeDndContext>
    </Page>
  );
};

export default Home;
