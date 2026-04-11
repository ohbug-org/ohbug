/**
 * Creates a JSON replacer that strips circular references.
 * Must be called fresh for each `JSON.stringify` — the internal WeakSet
 * tracks objects from that single serialization pass.
 */
export const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (_: any, value: any) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }

      seen.add(value);
    }
    return value;
  };
};
