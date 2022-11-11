import { useMatches } from "@remix-run/react";

export function useOutletHandle<T>() {
  const handles = useMatches()
    .filter((match) => match.handle)
    .map((match) => match.handle);

  if (handles.length === 0) {
    throw new Error(`This route should export a handle`);
  }

  return handles as T[];
}
