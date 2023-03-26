export function getChunk(array, chunkNumber) {
  const chunkSize = 10;
  const startIndex = (chunkNumber - 1) * chunkSize;
  const endIndex = startIndex + chunkSize;
  return array.slice(startIndex, endIndex);
}
