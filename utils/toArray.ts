// async iteratorを配列に変換する関数
export async function toArray<U, T extends Deno.KvEntry<U>>(
  asyncIterator: AsyncIterable<T>,
) {
  const array: U[] = [];
  for await (const item of asyncIterator) {
    array.push(item.value);
  }
  return array;
}
