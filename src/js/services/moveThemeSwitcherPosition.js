import { refs } from '../refs/refs';

export const moveThemeSwitcher = size => {
  console.log('moveThemeSwitcher size', size)
  if (size === 'mobile') {
    refs.mobileViewMenu.append(refs.themeSwitcher);
  } else {
      refs.searchFormDiv.after(refs.themeSwitcher)
  }
};
