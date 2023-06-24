import { refs } from '../refs/refs';

export const currentPageLinkStyler = page => {
  switch (page) {
    case 'home':
      console.log('case home', page);
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
      console.log('case favorite', page);
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
      console.log('case read', page);
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
