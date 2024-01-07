import { RouteContext } from "$fresh/server.ts";
import { Menu } from "model/Menu.ts";

export default async function Show(_req: Request, ctx: RouteContext) {
  const menu = await Menu.find(ctx.params.id);

  if (!menu) {
    return (
      <div>
        <h1>Not Found</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>{menu.name}</h1>
      <p>{menu.description}</p>
    </div>
  );
}
