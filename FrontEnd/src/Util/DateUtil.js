export function currentBOM() {
  const current = new Date();
  return new Date(current.getFullYear(), current.getMonth(), 1);
}

export function currentEOM() {
  const current = new Date();
  return new Date(current.getFullYear(), current.getMonth() + 1, 0);
}
