export function ReloadButton() {
  return (
    <button
      onClick={() => {
        location.reload();
      }}
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full h-16 text-xl"
    >
      引き直す
    </button>
  );
}
