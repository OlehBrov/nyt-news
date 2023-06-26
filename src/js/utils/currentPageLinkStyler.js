import { refs } from '../refs/refs';

export const currentPageLinkStyler = page => {
  switch (page) {
    case 'home':

      refs.homeLink.forEach(link => {
        link.classList.add('current-page');
      });
      refs.favoritesLink.forEach(link => {
        link.classList.remove('current-page');
      });
      refs.readLink.forEach(link => {
        link.classList.remove('current-page');
      });
      break;
    case 'favorite':

      refs.homeLink.forEach(link => {
        link.classList.remove('current-page');
      });
      refs.favoritesLink.forEach(link => {
        link.classList.add('current-page');
      });
      refs.readLink.forEach(link => {
        link.classList.remove('current-page');
      });
      break;
    case 'read':

      refs.homeLink.forEach(link => {
        link.classList.remove('current-page');
      });
      refs.favoritesLink.forEach(link => {
        link.classList.remove('current-page');
      });
      refs.readLink.forEach(link => {
        link.classList.add('current-page');
      });
      break;
    default:
      break;
  }
};
