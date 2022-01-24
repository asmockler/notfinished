import type { NextPage } from "next";
import { useQuery, gql, useMutation } from "@apollo/client";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { useState } from "react";
import Image from "next/image";
import { Page } from "../components/ui-kit";
import { Calendar } from "../components/Home/Calendar";
import { TaskList } from "../components/Home/TaskList";
import { NewTask } from "../components/Home/NewTask";

const Home: NextPage = () => {
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 7 },
  });
  const sensors = useSensors(pointerSensor);
  const { loading, data, refetch } = useQuery(gql`
    query TasksQuery {
      me {
        id
        email
        image
        tasks {
          id
          name
          time
          duration
          complete
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

  async function handleDragEnd(id: number, time: Date | null) {
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
        sensors={sensors}
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

              {loading ? (
                <p>Loading</p>
              ) : (
                <div className="flex-grow">
                  <TaskList
                    tasks={data.me.tasks.filter(
                      (task: any) => task.time == null
                    )}
                    activeTaskId={activeDrag}
                  />
                </div>
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
