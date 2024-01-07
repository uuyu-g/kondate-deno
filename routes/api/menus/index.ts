import { Handlers } from "$fresh/server.ts";
import { Menu } from "model/Menu.ts";

type CreateMenuRequest = {
  name: string;
  description: string;
};

export const handler: Handlers<Menu | null> = {
  async GET(_req, _ctx) {
    const menus = await Menu.all();

    return new Response(JSON.stringify(menus));
  },
  async POST(req, _ctx) {
    const menuReq = (await req.json()) as CreateMenuRequest;
    const menu = await Menu.create(menuReq);

    return new Response(JSON.stringify(menu));
  },
};
