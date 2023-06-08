import { refs } from "../refs/refs";

export const localTheme = localStorage.getItem('theme')
  ? JSON.parse(localStorage.getItem('theme'))
    : {
      theme: 'light'
    };

export const setTheme = async () => {
    const savedTheme = await localTheme
    console.log('savedTheme', savedTheme)
    refs.themeSwitcher.checked ? savedTheme.theme = 'dark' : savedTheme.theme = 'light';
}    
    
export const themeToLocalStorage = (color) => {
    const themeObject = {
        theme: color,
    }
    localStorage.setItem('theme', JSON.stringify(themeObject))
}

