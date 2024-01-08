export function ReloadButton() {
  return (
    <button
      onClick={() => {
        location.reload();
      }}
      class="w-full font-bold h-16 text-xl"
    >
      引き直す
    </button>
  );
}
