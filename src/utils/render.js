export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

export const render = (container, component, place = RenderPosition.BEFOREEND) => {
  switch (place) {

    case RenderPosition.AFTERBEGIN:
      container.prepend(component.element);
      break;

    default:
      container.append(component.element);
      break;

  }
};

export const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.element.parentElement;
  const newElement = newComponent.element;
  const oldElement = oldComponent.element;

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

export const remove = (component) => {
  component.element.remove();
  component.removeElement();
};
