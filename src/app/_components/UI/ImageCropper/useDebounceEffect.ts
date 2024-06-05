import { useEffect } from "react";

export function useDebounceEffect(
  fn: () => void,
  waitTime: number,
  deps: unknown[] = [],
) {
  useEffect(() => {
    const t = setTimeout(() => {
      fn();
    }, waitTime);

    return () => {
      clearTimeout(t);
    };
  }, deps);
}
