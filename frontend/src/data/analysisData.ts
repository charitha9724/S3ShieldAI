export function getAnalysis() {
  const stored = sessionStorage.getItem("analysis");

  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }

  return null;
}