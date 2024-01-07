import { ComponentChildren } from "preact";
import { Menu } from "model/Menu.ts";
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET: async (_req, ctx) => {
    return await ctx.render();
  },
};

const Card = ({ children }: { children: ComponentChildren }) => {
  return (
    <div className="bg-amber-400 p-4 rounded-md h-48 w-11/12 shadow">
      {children}
    </div>
  );
};

const MenuCard = ({ menu }: { menu: Menu }) => {
  return (
    <Card>
      <div class="flex justify-center items-center flex-col h-full text-zinc-700">
        <p class="text-3xl font-bold">
          {menu.name}
        </p>
        <p>{menu.description}</p>
      </div>
    </Card>
  );
};

export default function Home() {
  return (
    <div class="flex flex-col justify-center gap-6">
      <div class="w-full m-auto">
        <div class="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md w-full text-4xl flex justify-center items-center p-2 h-80">
          <a href="menus/random">
            今日の献立は？
          </a>
        </div>
      </div>
      <div class="flex justify-center">
        <a href="menus/new" class="underline text-blue-600">Add Menu</a>
      </div>
    </div>
  );
}
