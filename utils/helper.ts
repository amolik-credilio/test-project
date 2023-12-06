export default function assignIds(arr: any[]) {
  return arr.map((str, index) => {
    return { id: index, value: str }
  })
}
