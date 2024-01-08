import { PageProps } from "$fresh/server.ts";

const TITLE_MAP: Record<string, string> = {
  "/": "",
  "/menus/new": "New Menu",
};

export default function Layout({ Component, route }: PageProps) {
  if (route === "/") {
    return (
      <>
        <header class="h-1/2 flex flex-col justify-center items-center">
          <h1 class="text-6xl border-2
            border-solid border-zinc-900 rounded-md
            px-8 py-6
          ">
            kon-date
          </h1>
        </header>
        <main class="flex-1">
          <Component />
        </main>
      </>
    );
  }

  return (
    <>
      <header class="font-bold py-1 mb-2">
        <a href="/" class="no-underline">
          <h1 class="inline-block py-1 px-3 rounded text-2xl border border-solid border-zinc-900">
            kon-date
          </h1>
        </a>
      </header>
      <main class="flex-1">
        <Component />
      </main>
    </>
  );
}
