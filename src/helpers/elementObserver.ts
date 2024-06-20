const visibilityMap = new Map();
const callbackMap = new Map();

const observerCallback = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log(entry);
      console.log(callbackMap);
      console.log(callbackMap.has(entry.target));

      if (callbackMap.has(entry.target)) {
        callbackMap.get(entry.target)();
      }
    }
  });
};
const observer = new IntersectionObserver(observerCallback);

/*
 * Adds element(s) to observe
 */
export const addElementsToObserve = (elements: HTMLCollectionOf<Element>) => {
  for (const element of elements) {
    observer.observe(element);
  }
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