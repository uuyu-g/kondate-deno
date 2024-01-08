import { toArray } from "utils/toArray.ts";
import { kv } from "model/db.ts";

type CreateMenuParams = {
  name: string;
  description: string;
};

type UpdateMenuParams = {
  name: string;
  description: string;
};

export class Menu {
  name: string;
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }

  static async find(name: string): Promise<Menu | null> {
    return (await kv.get<Menu>(["menus", name])).value;
  }

  static all(): Promise<Menu[]> {
    return toArray(kv.list<Menu>({ prefix: ["menus"] }));
  }

  static async create({ name, description }: CreateMenuParams): Promise<Menu> {
    const menu = new Menu(name, description);
    const menuKey = ["menus", menu.name];
    const ok = await kv.set(menuKey, menu);
    if (!ok) throw new Error("Something went wrong.");
    return menu;
  }

  static async update(params: UpdateMenuParams) {
    const newMenu = new Menu(params.name, params.description);
    const menuKey = ["menus", params.name];
    const ok = await kv.set(menuKey, newMenu);
    if (!ok) throw new Error("Something went wrong.");
    return newMenu;
  }

  static delete(id: string) {
    return kv.delete(["menus", id]);
  }
}
