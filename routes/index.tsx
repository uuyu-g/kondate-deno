import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET: async (_req, ctx) => {
    return await ctx.render();
  },
};

export default function Home() {
  return (
    <div class="h-full flex flex-col justify-center gap-6">
      <div class="flex-1">
        <a
          href="menus/random"
          class="button h-full flex flex-col justify-center items-center text-3xl font-bold"
        >
          今日の献立は？
        </a>
      </div>
      <div class="flex flex-col items-center">
        <a href="menus/new">献立を追加する</a>
      </div>
    </div>
  );
}
