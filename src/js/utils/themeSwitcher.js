import { themeToLocalStorage } from '../localStorage/colorThemeHandler';
import { refs } from '../refs/refs';

export const themeSwitcherPosition = screen => {
  if (screen === 'mobile') {
    refs.themeSwitcher.classList.add('mobile');
  }
  if (screen !== 'mobile') {
    refs.themeSwitcher.classList.remove('mobile');
  }
};

export const handleThemeSwitcher = ({target}) => {
  if (target.checked) {
      refs.body.classList.add('darkMode');
      themeToLocalStorage('dark')
  } else {
      refs.body.classList.remove('darkMode');
      themeToLocalStorage('light')
  }
};

refs.themeSwitcher.addEventListener('change', handleThemeSwitcher);
