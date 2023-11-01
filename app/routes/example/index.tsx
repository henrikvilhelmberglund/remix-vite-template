import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

export async function loader({
  // Route loaders provide data to the UI
  request,
}: LoaderFunctionArgs) {
  return json({
    status: 200,
    message: data.message,
  });
}

const data = {
  // This is a simplified in-memory data store.
  message: "This works!",
};

export function updateMessage(newMessage: string) {
  data.message = newMessage;
}

export default function Index() {
  const result = useLoaderData<typeof loader>();
  return (
    <>
      <h1 className="text-3xl">This is a sample route</h1>
      <h2>{JSON.stringify(result)}</h2>
      <Form className="flex gap-4" action="/example" method="post">
        <input type="text" name="message" defaultValue={result.message} />

        <button className="p-2 bg-green-300 rounded-md" type="submit">
          Save
        </button>
      </Form>
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const newMessage = formData.get("message") as string;

  updateMessage(newMessage);

  // return redirect("/example");
  return json({ ok: true });
}
