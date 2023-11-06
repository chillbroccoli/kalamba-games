export function isNilOrEmpty(value: unknown) {
  return (
    value === null ||
    value === undefined ||
    (typeof value === "string" && value.trim() === "") ||
    (value instanceof Array && value.length === 0) ||
    (typeof value === "object" && Object.keys(value).length === 0)
  );
}
