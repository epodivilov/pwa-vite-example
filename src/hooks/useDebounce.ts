import { useRef, useEffect, useMemo } from "react";

// Using unknown[] instead of any[] to avoid linter errors
type AnyArgs = unknown[];

/**
 * Debounces function calls
 */
function debounce<TArgs extends AnyArgs, TResult>(
  callback: (...args: TArgs) => TResult,
  timeout?: number
): (...args: TArgs) => void {
  let timeoutId: number;

  return (...args: TArgs) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), timeout);
  };
}

/**
 * Creates a debounced version of the callback function
 */
export function useDebounce<TArgs extends AnyArgs, TResult>(
  callback: (...args: TArgs) => TResult,
  timeout?: number
): (...args: TArgs) => void {
  const ref = useRef<(...args: TArgs) => TResult>(callback);

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = (...args: TArgs) => {
      ref.current?.(...args);
    };

    return debounce(func, timeout || 0);
  }, [timeout]);

  return debouncedCallback;
}