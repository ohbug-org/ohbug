// https://stackoverflow.com/questions/8648892/how-to-convert-url-parameters-to-a-javascript-object
const groupParamsByKey = (params: URLSearchParams) =>
  // @ts-expect-error worked
  [...params.entries()].reduce<Record<string, any>>((acc, tuple) => {
  // getting the key and value from each tuple
    const [key, val] = tuple
    // eslint-disable-next-line no-prototype-builtins
    if (acc.hasOwnProperty(key)) {
    // if the current key is already an array, we'll add the value to it
      if (Array.isArray(acc[key])) {
        acc[key] = [...acc[key], val]
      }
      else {
      // if it's not an array, but contains a value, we'll convert it into an array
      // and add the current value to it
        acc[key] = [acc[key], val]
      }
    }
    else {
    // plain assignment if no special case is present
      acc[key] = val
    }
    return acc
  }, {})

export function getParams(data: string) {
  const location = new URL(data)
  const url = location.origin + location.pathname
  const searchParams = location.search ? new URLSearchParams(location.search) : undefined
  const params = searchParams ? JSON.stringify(groupParamsByKey(searchParams)) : undefined
  return {
    url,
    params,
  }
}
