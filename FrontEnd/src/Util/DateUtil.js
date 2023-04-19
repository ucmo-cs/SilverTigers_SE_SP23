export function currentBOM() {
  const current = new Date();
  return new Date(current.getFullYear(), current.getMonth(), 1);
}

export function currentEOM() {
  const current = new Date();
  return new Date(current.getFullYear(), current.getMonth() + 1, 0);
}

export function formatDate(date) {
  const year = date.toLocaleDateString("default", { year: "numeric" });
  const month = date.toLocaleDateString("default", { month: "2-digit" });
  const day = date.toLocaleDateString("default", { day: "2-digit" });
  return year + "-" + month + "-" + day;
};