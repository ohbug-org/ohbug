export function replace(source: any, name: string, behavior: (...args: any[]) => any) {
  if (!(name in source)) {
    return
  }
  const original = source[name]
  const wrapped = behavior(original)
  source[name] = wrapped
}
