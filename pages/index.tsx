import type { NextPage } from "next";
import { useState } from "react";
import Image from "next/image";

import { Page } from "../components/ui-kit";
import { useHomeQuery } from "../components/Home/graphql/HomeQuery";
import { useUpdateTaskMutation } from "../components/Home/graphql/UpdateTaskMutation";
import { Calendar } from "../components/Home/Calendar";
import { TaskList } from "../components/Home/TaskList";
import { NewTask } from "../components/Home/NewTask";
import { HomeDndContext } from "../components/Home/HomeDndContext";

const Home: NextPage = () => {
  const [activeDrag, setActiveDrag] = useState<string | null>(null);
  const { loading, data, refetch } = useHomeQuery();
  const [mutate] = useUpdateTaskMutation();

  async function handleDragEnd(id: number, time: Date | null) {
    const mutRes = await mutate({
      variables: {
        input: { taskId: id, time },
      },
    });

    console.log(mutRes);

    refetch();
  }

  if (loading || data == null) {
    return <p>Loading...</p>;
  }

  if (data.me == null) {
    return <p>Time to log in!</p>;
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
            handleDragEnd(Number(event.active.id), null);
            return;
          }

          handleDragEnd(
            Number(event.active.id),
            event.over!.data.current!.time
          );
        }}
      >
        <div className="grid grid-cols-[1fr_250px]">
          {loading ? (
            <p>Loading</p>
          ) : (
            <Calendar
              tasks={data.me.tasks.filter((task: any) => task.time != null)}
            />
          )}

          <div className="border-l dark:border-slate-700 grid grid-rows-[2fr_min-content] h-screen">
            <div className="py-4 flex flex-col gap-y-2 overflow-y-auto">
              <h2 className="font-semibold text-2xl px-4">Tasks</h2>

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

            <div className="border-t p-4 dark:border-slate-700 flex justify-end items-center">
              {data.me.image == null ? (
                <p>{data.me.email}</p>
              ) : (
                <Image
                  src={data.me.image}
                  alt=""
                  width={35}
                  height={35}
                  className="rounded-full"
                />
              )}
            </div>
          </div>
        </div>
      </HomeDndContext>
    </Page>
  );
};

export default Home;
