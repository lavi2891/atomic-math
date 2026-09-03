export type SelectionState = "none" | "partial" | "all";

export function selectionState(selectedIds: readonly string[], childIds: readonly string[]): SelectionState {
  const selected = new Set(selectedIds);
  const count = childIds.filter((id) => selected.has(id)).length;
  if (count === 0) return "none";
  return count === childIds.length ? "all" : "partial";
}

export function toggleChild(selectedIds: readonly string[], childId: string): string[] {
  return selectedIds.includes(childId)
    ? selectedIds.filter((id) => id !== childId)
    : [...selectedIds, childId];
}

export function toggleParent(selectedIds: readonly string[], childIds: readonly string[]): string[] {
  const children = new Set(childIds);
  if (selectionState(selectedIds, childIds) === "all") {
    return selectedIds.filter((id) => !children.has(id));
  }
  return [...selectedIds.filter((id) => !children.has(id)), ...childIds];
}
