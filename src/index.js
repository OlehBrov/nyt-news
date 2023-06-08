import './js/search';
import './js/refs/refs';
import './js/mobileMenu';
import './js/indexPageJS/popularNews';
import './js/localStorage/localStorageHandler';
import './js/favoritesPage/favoriteNews';
import './js/utils/mqHandler';
import { refs } from './js/refs/refs';
import { newsGalleryMarkup } from './js/indexPageJS/popularNews';
import { checkFavorites } from './js/favoritesPage/checkIsFavorites';
import { checkRead } from './js/readPage/checkRead';
// import './js/services/pagination'
import { sectionsHandler } from './js/indexPageJS/sectionsFilter';
import { mqHandler } from './js/utils/mqHandler';
import './js/localStorage/colorThemeHandler'
import { setTheme } from './js/localStorage/colorThemeHandler';


if (
  window.location.pathname === '/' ||
  window.location.pathname === '/index.html'
) {
  newsGalleryMarkup();
  refs.categoriesList.addEventListener('change', sectionsHandler);
}

if (window.location.pathname === '/favorite.html') {
  checkFavorites();
}
if (window.location.pathname === '/read.html') {
  checkRead();
  refs.container.classList.add('none');
  refs.categoriesList.classList.add('none');
}
window.onload = mqHandler;
window.onload = setTheme;

// window.addEventListener('resize', event => {
//   console.log('event.currentTarget', event.currentTarget.innerWidth)
//   if (window.matchMedia(screen.mobile)) {
//     console.log('match mobile')
//     currentView.veiw = 'mobile';
//   }
//   if (window.matchMedia(screen.tablet)) {
//     currentView.veiw = 'tablet';
//       console.log('match tablet')
//   }
//   if (window.matchMedia(screen.desktop)) {
//     currentView.veiw = 'desktop';
//       console.log('match desktop')
//   }
// });
