export function assignIds(arr: any[]) {
  return arr.map((str, index) => {
    return { id: index, value: str }
  })
}

export function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}
