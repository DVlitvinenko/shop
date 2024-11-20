import { DirectiveBinding } from "vue";

interface IntersectionElement extends HTMLElement {
  __intersectionObserver__?: IntersectionObserver;
}

export const vIntersection = {
  name: "intersection",

  mounted(el: IntersectionElement, binding: DirectiveBinding) {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (binding.value && typeof binding.value === "function") {
            binding.value(entry);
          }
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(el);

    el.__intersectionObserver__ = observer;
  },
  unmounted(el: IntersectionElement) {
    if (el.__intersectionObserver__) {
      el.__intersectionObserver__.disconnect();
      delete el.__intersectionObserver__;
    }
  },
};
