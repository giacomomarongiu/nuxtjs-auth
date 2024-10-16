// composables/usePageTransition.ts

export function usePageTransition() {
  const beforeEnter = (el: HTMLElement) => {
    el.style.opacity = "0";
  };

  const enter = (el: HTMLElement, done: () => void) => {
    setTimeout(() => {
      el.style.transition = "opacity 0.5s ease";
      el.style.opacity = "1";
      done();
    }, 100);
  };

  const leave = (el: HTMLElement, done: () => void) => {
    el.style.transition = "opacity 0.5s ease";
    el.style.opacity = "0";
    setTimeout(() => done(), 500);
  };

  return {
    beforeEnter,
    enter,
    leave,
  };
}
