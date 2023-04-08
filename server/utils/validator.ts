export const validateInput = <B extends Object, F extends Object>(body: B, fields: F): boolean => {
  for (const field in fields) {
    if (!(field in body)) {
      return false
    }
  }
  return true
}
