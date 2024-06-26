const visibilityMap = new Map();
const callbackMap = new Map();

const observerCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // See if entry has a callback attached
      if (callbackMap.has(entry.target)) {
        callbackMap.get(entry.target)();
      }

      // Handle entry animations
      const { classList, id } = entry.target;
      for (const [classOrIdName, showClassName] of visibilityMap) {
        if (id === classOrIdName || classList.contains(classOrIdName)) {
          entry.target.classList.add(showClassName);
        }
      }

      observer.unobserve(entry.target);
    }
  });
};
const observer = new IntersectionObserver(observerCallback);

/*
 * Adds element(s) to observe
 */
export const addElementsToObserve = (elements: HTMLCollection | Element | null) => {
  // Is elements null?
  if (elements == null) {
    console.warn('addElementsToObserve: element is null');
    return;
  }

  // Is elements a colelction of elements?
  if (elements instanceof HTMLCollection) {
    for (const element of elements) {
      observer.observe(element);
    }
    return;
  }

  // elements is a single element
  observer.observe(elements);
}

/*
 * Adds a class name or id to track with the observer, and adds showClassName to
 * to elements with that class name or id
 */
export const addElementVisibilityTrigger = (classOrIdName: string, showClassName: string) => {
  visibilityMap.set(classOrIdName, showClassName);
}

/*
 * Adds an element to track. If that element is intersected, then run the provided callback
 */
export const addElementCallback = (element: Element | null, callback: () => void) => {
  if (element == null) {
    console.warn('addElementCallback: element is null');
    return;
  }
  callbackMap.set(element, callback);
}