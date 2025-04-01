import { useState, useCallback, useLayoutEffect, useEffect } from "react";

type Width = number;
type Height = number;
export type Size = [Width, Height];

const getViewportSize = (): Size => {
  if (window.visualViewport) {
    return [window.visualViewport.width, window.visualViewport.height] as const;
  }

  return [window.innerWidth, window.innerHeight] as const;
};

export const useViewportSize = (): Size | undefined => {
  const [viewportSize, setViewportSize] = useState<Size | undefined>();

  const updateViewportSize = useCallback(() => {
    const viewportSize = getViewportSize();

    setViewportSize((oldViewportSize) => {
      if (
        oldViewportSize &&
        oldViewportSize[0] === viewportSize[0] &&
        oldViewportSize[1] === viewportSize[1]
      ) {
        // Maintain old instance to prevent unnecessary updates
        return oldViewportSize;
      }

      return viewportSize;
    });
  }, []);

  useLayoutEffect(updateViewportSize, [updateViewportSize]);

  useEffect(() => {
    const effectTwice = () => {
      updateViewportSize();

      Promise.resolve().then(() => {
        requestAnimationFrame(() => {
          updateViewportSize();
        });
      });
    };

    window.addEventListener("resize", effectTwice);
    window.addEventListener("orientationchange", effectTwice);
    window.visualViewport?.addEventListener("resize", effectTwice);

    return () => {
      window.removeEventListener("resize", effectTwice);
      window.removeEventListener("orientationchange", effectTwice);
      window.visualViewport?.removeEventListener("resize", effectTwice);
    };
  }, [updateViewportSize]);

  return viewportSize;
};