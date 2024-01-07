import { ComponentChildren } from "preact";
import { Menu } from "model/Menu.ts";
import { ReloadButton } from "../../islands/ReloadButton.tsx";

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
      <a href={`/menus/${menu.id}`}>
        <div class="flex justify-center items-center flex-col h-full text-zinc-700">
          <p class="text-3xl font-bold">
            {menu.name}
          </p>
          <p>{menu.description}</p>
        </div>
      </a>
    </Card>
  );
};

export default async function Home() {
  const menus = (await Menu.all()).sort(() => Math.random() - 0.5).slice(0, 3);

  return (
    <div class="flex flex-col justify-center gap-6">
      <div className="grid grid-cols-1 gap-4 justify-items-center">
        {menus.map((menu) => <MenuCard key={menu.id} menu={menu} />)}
      </div>
      <div class="w-11/12 m-auto">
        <ReloadButton />
      </div>
      <div class="flex justify-center">
        <a href="/menus/new" class="underline text-blue-600">献立を追加する</a>
      </div>
    </div>
  );
}
