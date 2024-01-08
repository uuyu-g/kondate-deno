import { Handlers, PageProps } from "$fresh/server.ts";
import { Menu } from "model/Menu.ts";

const redirect = (location: string) => {
  const headers = new Headers();
  headers.set("location", location);
  return new Response(null, {
    status: 303,
    headers,
  });
};

type Data = Partial<
  Menu & {
    errors?: Record<string, string>;
  }
>;

export const handler: Handlers<
  Partial<Menu & { errors?: Record<string, string> }>
> = {
  POST: async (req, ctx) => {
    const form = await req.formData();
    const name = form.get("name") as string | null;
    const description = (form.get("description") ?? "") as string;
    if (!name) {
      return ctx.render({
        description,
        errors: {
          name: "Missing name",
        },
      });
    }

    await Menu.create({ name, description });

    return redirect("/");
  },
};

export default function New(props: PageProps<Data>) {
  const {
    errors = {},
    description = "",
  } = props.data ?? {};

  return (
    <form method="post" class="flex flex-col gap-8 h-full">
      <div class="flex-1 flex flex-col gap-4">
        <div>
          <label class="flex flex-col gap-1">
            名前
            <input type="text" name="name" />
          </label>
          {errors.name && <p class="text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label class="flex flex-col gap-1">
            メモ
            <input type="text" name="description" value={description} />
          </label>
        </div>
      </div>
      <button type="submit">献立を追加</button>
    </form>
  );
}
