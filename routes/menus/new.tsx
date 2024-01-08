import { Handlers, PageProps } from "$fresh/server.ts";
import { Menu } from "model/Menu.ts";
import { redirect } from "utils/redirect.tsx";

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
          name: "名前を入力してください",
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
    <form method="post" class="flex flex-col h-full justify-center">
      <div class="flex-1 flex flex-col gap-4">
        <h2>新しい献立を追加</h2>
        <div>
          <label required class="flex flex-col gap-1">
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
