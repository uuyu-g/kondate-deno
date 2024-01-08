import { ulid } from "https://deno.land/x/ulid@v0.3.0/mod.ts";
import { kv } from "model/db.ts";
import { toArray } from "utils/toArray.ts";

export const toDateString = (date: Date) => {
  return date.toISOString().split("T")[0];
};

export type MealType = "breakfast" | "lunch" | "dinner";
export type RecentMenuHistory = {
  date: string;
  breakfast: string | null;
  lunch: string | null;
  dinner: string | null;
};

export class MenuHistory {
  id: string;
  date: Date;
  menu: string;
  mealType: MealType;

  constructor(
    date: Date,
    mealType: MealType,
    menu: string,
  ) {
    this.id = ulid();
    this.date = date;
    this.menu = menu;
    this.mealType = mealType;
  }

  static async all(): Promise<MenuHistory[]> {
    const menuHistoryKey = ["menuHistories"];
    const menuHistory: MenuHistory[] = await toArray(
      kv.list<MenuHistory>({
        prefix: menuHistoryKey,
      }),
    );
    return menuHistory;
  }

  static async recentFromDB(): Promise<RecentMenuHistory[]> {
    const menuHistoryKey = ["menuHistories"];
    const aWeekAgo = new Date();
    aWeekAgo.setDate(aWeekAgo.getDate() - 7);
    const menuHistory: MenuHistory[] = await toArray(
      kv.list<MenuHistory>({
        prefix: menuHistoryKey,
        start: [...menuHistoryKey, toDateString(aWeekAgo)],
      }),
    );
    const map = menuHistory.reduce((acc, cur) => {
      const { date, mealType, menu } = cur;
      const dateStr = toDateString(date);
      const historyMap: Map<string, {
        breakfast: string | null;
        lunch: string | null;
        dinner: string | null;
      }> = acc;
      const history = historyMap.get(dateStr) ?? {
        breakfast: null,
        lunch: null,
        dinner: null,
      };
      history[mealType] = menu;
      historyMap.set(dateStr, history);
      return historyMap;
    }, new Map());
    const result = [...map.entries()].map(([date, menus]) => ({
      date,
      ...menus,
    }));
    // 直近7日分のデータを返す
    // 一週間のうちデータがない日はnullで埋める
    const today = new Date();
    const result2 = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = toDateString(date);
      const menu = result.find((h) => h.date === dateStr);
      if (menu) {
        result2.push(menu);
      } else {
        result2.push({
          date: dateStr,
          breakfast: null,
          lunch: null,
          dinner: null,
        });
      }
    }
    return result2;
  }

  static async create(
    date: Date,
    mealType: MealType,
    menu: string,
  ) {
    const menuHistory = new MenuHistory(date, mealType, menu);
    const menuHistoryKey = [
      "menuHistories",
      toDateString(menuHistory.date),
      menuHistory.id,
    ];

    const ok = await kv.set(menuHistoryKey, menuHistory);
    if (!ok) {
      throw new Error("Failed to create a menu history");
    }
    return menuHistory;
  }
}

const menuHistory: MenuHistory[] = [
  new MenuHistory(new Date("2024-01-01"), "breakfast", "ごはん"),
  new MenuHistory(new Date("2024-01-01"), "lunch", "うどん"),
  new MenuHistory(new Date("2024-01-01"), "dinner", "カレー"),
  new MenuHistory(new Date("2024-01-02"), "breakfast", "ごはん"),
  new MenuHistory(new Date("2024-01-02"), "lunch", "うどん"),
  new MenuHistory(new Date("2024-01-02"), "dinner", "カレー"),
  new MenuHistory(new Date("2024-01-03"), "breakfast", "ごはん"),
  new MenuHistory(new Date("2024-01-03"), "lunch", "うどん"),
  new MenuHistory(new Date("2024-01-03"), "dinner", "カレー"),
  new MenuHistory(new Date("2024-01-04"), "breakfast", "ごはん"),
  new MenuHistory(new Date("2024-01-04"), "lunch", "うどん"),
  new MenuHistory(new Date("2024-01-04"), "dinner", "カレー"),
  new MenuHistory(new Date("2024-01-05"), "breakfast", "ごはん"),
  new MenuHistory(new Date("2024-01-05"), "lunch", "うどん"),
  new MenuHistory(new Date("2024-01-05"), "dinner", "カレー"),
  new MenuHistory(new Date("2024-01-06"), "breakfast", "ごはん"),
  new MenuHistory(new Date("2024-01-06"), "lunch", "うどん"),
  new MenuHistory(new Date("2024-01-06"), "dinner", "カレー"),
  new MenuHistory(new Date("2024-01-07"), "breakfast", "ごはん"),
  new MenuHistory(new Date("2024-01-07"), "lunch", "うどん"),
  new MenuHistory(new Date("2024-01-07"), "dinner", "カレー"),
  new MenuHistory(new Date("2024-01-08"), "breakfast", "ごはん"),
];
