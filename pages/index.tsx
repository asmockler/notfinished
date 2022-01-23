import type { NextPage } from "next";
import { useQuery, gql, useMutation } from "@apollo/client";
import { DndContext } from "@dnd-kit/core";
import { useState } from "react";
import { getSession } from "next-auth/react";
import { Page, TextField } from "../components/ui-kit";
import { Calendar } from "../components/Home/Calendar";
import { TaskList } from "../components/Home/TaskList";

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  console.log(session?.user);

  return {
    props: { session },
  };
}

const Home: NextPage = () => {
  const { loading, data, refetch } = useQuery(gql`
    query TasksQuery {
      users {
        name
        tasks {
          id
          name
          time
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
              tasks={data.users[0].tasks.filter(
                (task: any) => task.time != null
              )}
            />
          )}

          <div className="overflow-y-auto border-l">
            <div className="p-4 flex flex-col gap-y-2">
              <h2 className="font-semibold text-2xl">Tasks</h2>

              <TextField />

              {loading ? (
                <p>Loading</p>
              ) : (
                <TaskList
                  tasks={data.users[0].tasks.filter(
                    (task: any) => task.time == null
                  )}
                  activeTaskId={activeDrag}
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
