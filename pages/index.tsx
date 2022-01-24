import type { NextPage } from "next";
import { useQuery, gql, useMutation } from "@apollo/client";
import { DndContext } from "@dnd-kit/core";
import { useState } from "react";
import { Page, TextField } from "../components/ui-kit";
import { Calendar } from "../components/Home/Calendar";
import { TaskList } from "../components/Home/TaskList";
import Image from "next/image";

const Home: NextPage = () => {
  const { loading, data, error, refetch } = useQuery(gql`
    query TasksQuery {
      me {
        id
        email
        image
        tasks {
          id
          name
        }
      }
    }
  `);

  const [mutate] = useMutation(gql`
    mutation ($input: TaskUpdateInput!) {
      taskUpdate(input: $input) {
        id
        time
        name
      }
    }
  `);

  async function handleDragEnd(id: number, time: Date) {
    const mutRes = await mutate({
      variables: {
        input: { taskId: id, time },
      },
    });

    console.log(mutRes);

    refetch();
  }

  const [activeDrag, setActiveDrag] = useState<string | null>(null);

  return (
    <Page>
      <DndContext
        onDragStart={(event) => {
          console.log("drag start index", event);
          setActiveDrag(event.active.id);
        }}
        onDragEnd={(event) => {
          console.log("drag end index", event.over?.data.current);

          handleDragEnd(
            Number(event.active.id),
            event.over!.data.current!.time
          );

          setActiveDrag(null);
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
            <div className="p-4 flex flex-col gap-y-2 overflow-y-auto">
              <h2 className="font-semibold text-2xl">Tasks</h2>

              <TextField />

              {loading ? (
                <p>Loading</p>
              ) : (
                <TaskList
                  tasks={data.me.tasks.filter((task: any) => task.time == null)}
                  activeTaskId={activeDrag}
                />
              )}
            </div>

            <div className="border-t p-4 dark:border-slate-700 flex justify-end items-center">
              {loading ? null : (
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
      </DndContext>
    </Page>
  );
};

export default Home;
