import { Handlers } from "$fresh/server.ts";
import { Menu } from "model/Menu.ts";

export const handler: Handlers = {
  POST: async (req, ctx) => {
    const form = await req.formData();
    const name = form.get("name") as string | null;
    const description = (form.get("description") ?? "") as string;
    if (!name) {
      return new Response("Missing name or description", {
        status: 400,
      });
    }

    await Menu.create({ name, description });

    const headers = new Headers();
    headers.set("location", "/");
    return new Response(null, {
      status: 303,
      headers,
    });
  },
};

export default function New() {
  return (
    <form method="post" class="flex flex-col gap-8 h-full">
      <div class="flex-1 flex flex-col gap-4">
        <div>
          <label class="flex flex-col gap-1">
            名前
            <input type="text" name="name" />
          </label>
        </div>
        <div>
          <label class="flex flex-col gap-1">
            メモ
            <input type="text" name="description" />
          </label>
        </div>
      </div>
      <button type="submit">献立を追加</button>
    </form>
  );
}
