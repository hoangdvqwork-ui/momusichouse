import type { MutableRefObject, RefCallback } from "react";

/**
 * Combines multiple refs (hook-returned ref objects or callback refs)
 * onto a single element -- needed wherever two scroll-driven hooks
 * (e.g. useParallax + useScrollEdgeBlur) both want a ref on the same
 * node, since a DOM element can only take one `ref` prop directly.
 */
export function mergeRefs<T>(
  ...refs: Array<MutableRefObject<T | null> | RefCallback<T> | null | undefined>
) {
  return (node: T | null) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === "function") ref(node);
      else (ref as MutableRefObject<T | null>).current = node;
    }
  };
}
