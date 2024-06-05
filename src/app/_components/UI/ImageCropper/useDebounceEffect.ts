import { useEffect } from "react";

export function useDebounceEffect(
  fn: () => void | Promise<void>,
  waitTime: number,
  deps: unknown[] = [],
) {
  useEffect(() => {
    const handleEffect = async () => {
      try {
        await fn();
      } catch (error) {
        // Handle errors here if necessary
        console.error("Error occurred:", error);
      }
    };

    const timeoutId = setTimeout(handleEffect, waitTime);

    return () => {
      clearTimeout(timeoutId);
    };
  }, deps);
}
