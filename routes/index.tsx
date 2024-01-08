import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET: async (_req, ctx) => {
    return await ctx.render();
  },
};

export default function Home() {
  return (
    <div class="flex flex-col h-full">
      <div class="flex-1 flex flex-col justify-center items-center">
        <h1 class="text-6xl border-2
              border-solid border-zinc-900 rounded-md
              px-8 py-6
            ">
          kon-date
        </h1>
      </div>

      <div class="flex flex-col justify-center gap-6">
        <div class="h-[300px] grid grid-cols-2 grid-rows-2 gap-3">
          <div>
            <a
              href="menus/new"
              class="button h-full flex flex-col justify-center items-center text-lg font-bold bg-white border border-solid border-zinc-400 text-zinc-500 rounded-lg"
            >
              献立を追加する
            </a>
          </div>
          <div>
            <a
              href="#"
              class="button h-full flex flex-col justify-center items-center text-5xl font-bold bg-white border border-solid border-zinc-400 text-zinc-500 rounded-lg"
            >
              🗓
            </a>
          </div>
          <div class="col-span-2">
            <a
              href="menus/random"
              class="button h-full flex flex-col justify-center items-center text-3xl font-bold"
            >
              今日の献立は？
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
