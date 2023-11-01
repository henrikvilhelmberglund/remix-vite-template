import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import dotenv from "dotenv";
import Movie from "~/components/Movie";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({
  // Route loaders provide data to the UI
  request,
}: LoaderFunctionArgs) {
  dotenv.config();
  // const page = req.query.page;
  const page = 1;
  // console.log(process.env);
  const url = `${process.env.BASE_URL}discover/movie?page=1&language=sv-SE&sort_by=popularity.desc&page=${page}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization: `Bearer ${process.env.TOKEN}`,
    },
  };
  const response = await fetch(url, options);
  if (response.status === 200) {
    const result = await response.json();
    console.log(result);
    return json({
      status: 200,
      success: true,
      message: "movies list is working!",
      result: result,
    });
  }
}

export default function Index() {
  const movies = useLoaderData<typeof loader>();
  return (
    <div
      className="p-4"
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1 className="text-7xl p-4">Welcome to Remix</h1>
      <h2 className="text-3xl p-4 text-green-500">Now with UnoCSS</h2>
      <ul className="p-4">
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer">
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer">
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
      <div className="grid grid-cols-3 w-full">
        {movies &&
          movies.result.results.map((movie) => (
            // here to prevent prettier from moving tag
            <Movie movie={movie} />
          ))}
      </div>
    </div>
  );
}
