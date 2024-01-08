import { ComponentChildren } from "preact";
import { Menu } from "model/Menu.ts";
import { ReloadButton } from "../../islands/ReloadButton.tsx";

const Card = ({ children }: { children: ComponentChildren }) => {
  return (
    <div className="border-2 border-double border-zinc-300 p-4 rounded-md h-48 w-full hover:bg-zinc-100">
      {children}
    </div>
  );
};

const MenuCard = ({ menu }: { menu: Menu }) => {
  return (
    <a href={`/menus/${menu.id}`} class="no-underline">
      <Card>
        <div class="flex justify-center items-center flex-col h-full text-zinc-700">
          <p class="text-3xl font-bold">
            {menu.name}
          </p>
          {menu.description && <p>{menu.description}</p>}
        </div>
      </Card>
    </a>
  );
};

export default async function Home() {
  const menus = (await Menu.all()).sort(() => Math.random() - 0.5).slice(0, 3);

  return (
    <div class="flex flex-col h-full">
      <div class="flex-1 flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          {menus.map((menu) => <MenuCard key={menu.id} menu={menu} />)}
        </div>
      </div>
      <div class="flex flex-col gap-4 items-center w-full">
        <a href="/menus/new">献立を追加する</a>
        <ReloadButton />
      </div>
    </div>
  );
}
