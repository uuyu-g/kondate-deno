import { PageProps } from "$fresh/server.ts";

const TITLE_MAP: Record<string, string> = {
  "/": "",
  "/menus/new": "New Menu",
};

export default function Layout({ Component, route }: PageProps) {
  return (
    <div class="p-4">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold">
          <a href="/">Kondate</a>
        </h1>
        {TITLE_MAP[route] && (
          <h2 class="text-lg">
            {TITLE_MAP[route]}
          </h2>
        )}
      </div>
      <Component />
    </div>
  );
}
