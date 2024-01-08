import { Handlers, RouteContext } from "$fresh/server.ts";
import { Menu } from "model/Menu.ts";
import { MealType, MenuHistory, toDateString } from "model/MenuHistory.ts";
import { redirect } from "utils/redirect.tsx";

const validate = (
  key: string,
  value: string | null,
  message = "必須項目です",
) => {
  if (!value) {
    return {
      [key]: message,
    };
  }
  return {};
};

export const handler: Handlers = {
  // MenuHistoryを作成する
  POST: async (req, ctx) => {
    const form = await req.formData();
    const date = form.get("date") as string | null;
    const mealType = form.get("mealType") as MealType | null;
    const menu = form.get("menu") as string | null;

    if (!date || !mealType || !menu) {
      const errors = {
        ...validate("date", date, "日付を入力してください"),
        ...validate("mealType", mealType, "いつ食べたかを入力してください"),
        ...validate("menu", menu, "献立を入力してください"),
      };
      return ctx.render({ errors });
    }

    await MenuHistory.create(new Date(date), mealType, menu);

    return redirect("/");
  },
};

export default async function Show(_req: Request, ctx: RouteContext) {
  const menu = await Menu.find(decodeURIComponent(ctx.params.name));

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
      <form method="post">
        <input
          type="text"
          hidden
          name="date"
          value={toDateString(new Date())}
        />
        <input type="text" hidden name="menu" value={menu.name} />
        <div class="flex justify-between space-x-3">
          <button name="mealType" value="breakfast" class="w-full">
            朝食べた
          </button>
          <button name="mealType" value="lunch" class="w-full">昼食べた</button>
          <button name="mealType" value="dinner" class="w-full">
            夜食べた
          </button>
        </div>
      </form>
    </div>
  );
}
