import { refs } from '../refs/refs';

export const moveThemeSwitcher = size => {

  if (size === 'mobile') {
    refs.mobileViewMenu.append(refs.themeSwitcher);
  } else {
      refs.searchFormDiv.after(refs.themeSwitcher)
  }
};
