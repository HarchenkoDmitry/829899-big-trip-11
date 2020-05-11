export const enumPosition = {
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`,
  BEFOREEND: `beforeend`,
};

export const render = (container, component, place = enumPosition.BEFOREEND) => {
  switch (place) {

    case enumPosition.AFTERBEGIN:
      container.prepend(component.element);
      break;

    case enumPosition.AFTEREND:
      container.after(component.element);
      break;

    default:
      container.append(component.element);
      break;

  }
};

export const remove = (component) => {
  component.element.remove();
  component.removeElement();
};
