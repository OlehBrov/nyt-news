import { refs } from '../refs/refs';


export const localTheme = localStorage.getItem('theme')
  ? JSON.parse(localStorage.getItem('theme'))
  : {
      theme: 'light',
    };

export const setTheme = async () => {
  const savedTheme = await localTheme;
 
  if (savedTheme.theme === 'dark') {
    refs.body.classList.add('darkMode');
    return (refs.themeSlider.checked = true);
  }
  if (savedTheme.theme === 'light') {
    refs.body.classList.remove('darkMode');
    return (refs.themeSlider.checked = false);
  }
};

export const themeToLocalStorage = color => {
  const themeObject = {
    theme: color,
  };
  localStorage.setItem('theme', JSON.stringify(themeObject));
};
