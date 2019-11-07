let timeout: NodeJS.Timeout | null
export function debounce(func: (args: any) => any, threshold: number = 200) {
  return function debounced(...args: any[]) {
    function delayed() {
      func.apply(debounced, args)
      timeout = null
    }

    if (timeout) clearTimeout(timeout)

    timeout = setTimeout(delayed, threshold)
  }
}

export function replace(source: any, name: string, behavior: (...args: any[]) => any) {
  if (!(name in source)) {
    return
  }
  const original = source[name]
  const wrapped = behavior(original)
  source[name] = wrapped
}
