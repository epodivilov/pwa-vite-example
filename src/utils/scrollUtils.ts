/**
 * Smoothly scrolls to the specified target position
 */
export function smoothScrollTo(params: { target: number; duration: number }): void {
  const { target, duration } = params;
  const start = window.scrollY;
  const startTime = performance.now();

  const animate = () => {
    const time = (performance.now() - startTime) / duration;
    const progress = Math.min(time, 1);
    const scrollPosition = start + (target - start) * progress;
    window.scrollTo(0, scrollPosition);

    if (time < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
}