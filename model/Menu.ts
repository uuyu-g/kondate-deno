import { ulid } from "https://deno.land/x/ulid@v0.3.0/mod.ts";
import { toArray } from "utils/toArray.ts";
import { kv } from "./db.ts";

type CreateMenuParams = {
  name: string;
  description: string;
};

type UpdateMenuParams = {
  name: string;
  description: string;
};

export class Menu {
  id: string;
  name: string;
  description: string;

  constructor(name: string, description: string) {
    this.id = ulid();
    this.name = name;
    this.description = description;
  }

  static async find(id: string): Promise<Menu | null> {
    return (await kv.get<Menu>(["menus", id])).value;
  }

  static all(): Promise<Menu[]> {
    return toArray(kv.list<Menu>({ prefix: ["menus"] }));
  }

  static async create({ name, description }: CreateMenuParams): Promise<Menu> {
    const menu = new Menu(name, description);
    const menuKey = ["menus", menu.id];
    const ok = await kv.set(menuKey, menu);
    if (!ok) throw new Error("Something went wrong.");
    return menu;
  }

  static async update(id: string, { name, description }: UpdateMenuParams) {
    const newMenu = new Menu(name, description);
    const menuKey = ["menus", id];
    const ok = await kv.set(menuKey, newMenu);
    if (!ok) throw new Error("Something went wrong.");
    return newMenu;
  }

  static delete(id: string) {
    return kv.delete(["menus", id]);
  }
}
