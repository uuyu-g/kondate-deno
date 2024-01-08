import { MenuHistory } from "../../model/MenuHistory.ts";

export default async function History() {
  const menuHistory = await MenuHistory.recent();

  return (
    <div>
      <h2>履歴</h2>
      <div class="grid grid-cols-[3rem_repeat(3,minmax(0,1fr))] gap-2 w-full text-center">
        <div></div>
        <div class="font-bold">朝</div>
        <div class="font-bold">昼</div>
        <div class="font-bold">夕</div>

        {menuHistory.map((h) => {
          const date = new Date(h.date);
          const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
          const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"][
            date.getDay()
          ];
          return (
            <>
              <div
                class={`flex justify-center items-center text-sm rounded p-1 ${
                  date.getDay() === 0 ? "bg-red-100" : ``
                }`}
              >
                {dateStr}
                <br />
                ({dayOfWeek})
              </div>

              {[h.breakfast, h.lunch, h.dinner].map((m) => {
                if (!m) {
                  return (
                    <div class="bg-zinc-100 flex flex-col items-center justify-center p-1 rounded">
                    </div>
                  );
                }

                return (
                  <a
                    href={`/menus/${m}`}
                    class="bg-zinc-100 flex flex-col items-center justify-center p-1 rounded no-underline"
                  >
                    {m}
                  </a>
                );
              })}
            </>
          );
        })}
      </div>
    </div>
  );
}
