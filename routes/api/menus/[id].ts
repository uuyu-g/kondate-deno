import { Menu } from "model/Menu.ts";
import { Handlers } from "$fresh/server.ts";

type UpdateMenuRequest = {
  name: string;
  description: string;
};

export const handler: Handlers<Menu | null> = {
  async GET(_req, ctx) {
    const id = ctx.params.id;
    const menu = await Menu.find(id);

    if (!menu) {
      return new Response(null, { status: 404 });
    }

    return new Response(JSON.stringify(menu));
  },
  async PUT(req, ctx) {
    const id = ctx.params.id;
    const menuReq = (await req.json()) as UpdateMenuRequest;
    const menu = await Menu.update(id, menuReq);

    if (!menu) {
      return new Response(null, { status: 404 });
    }

    return new Response(JSON.stringify(menu));
  },
  async DELETE(_req, ctx) {
    const id = ctx.params.id;
    await Menu.delete(id);

    return new Response(null, { status: 204 });
  },
};
