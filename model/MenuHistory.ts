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

// 引数の日数分前の日付を返す
const getPreviousDate = (date: Date, days: number) => {
  const previousDate = new Date(date);
  previousDate.setDate(previousDate.getDate() - days);
  return previousDate;
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

  static async recent(): Promise<RecentMenuHistory[]> {
    const menuHistoryKey = ["menuHistories"];
    const aWeekAgo = getPreviousDate(new Date(), 7);
    const menuHistories: MenuHistory[] = await toArray(
      kv.list<MenuHistory>({
        prefix: menuHistoryKey,
        start: [...menuHistoryKey, toDateString(aWeekAgo)],
      }),
    );
    const menuHistoryMap: Map<string, RecentMenuHistory> = menuHistories.reduce(
      (historyMap, cur) => {
        const { date, mealType, menu } = cur;
        const dateStr = toDateString(date);
        const history = historyMap.get(dateStr) ?? {
          date: dateStr,
          breakfast: null,
          lunch: null,
          dinner: null,
        };
        history[mealType] = menu;
        historyMap.set(dateStr, history);
        return historyMap;
      },
      new Map<string, RecentMenuHistory>(),
    );

    // 直近7日分のデータを返す
    // 一週間のうちデータがない日はnullで埋める
    const result = [];
    for (let i = 0; i < 7; i++) {
      const dateStr = toDateString(getPreviousDate(new Date(), i));
      const recentMenuHistory = menuHistoryMap.get(dateStr) ?? {
        date: dateStr,
        breakfast: null,
        lunch: null,
        dinner: null,
      };
      result.push(recentMenuHistory);
    }
    return result;
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
