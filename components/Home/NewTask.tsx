import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { TextField } from "../ui-kit";

export function NewTask() {
  const [taskName, setTaskName] = useState("");
  const [mutate] = useMutation(
    gql`
      mutation TaskCreate($input: TaskCreateInput!) {
        taskCreate(input: $input) {
          id
        }
      }
    `,
    { refetchQueries: ["TasksQuery"] }
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const foo = await mutate({
        variables: { input: { name: taskName, userId: 1 } },
      });

      if (foo.errors) console.error(JSON.stringify(foo.errors, null, 2));
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <TextField
        inlineButton
        name="New Task"
        onChange={(value) => setTaskName(value)}
        placeholder="New Task..."
        value={taskName}
      />
    </form>
  );
}
