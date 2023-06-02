import './js/search';
import './js/refs/refs';
import './js/mobileMenu';
import './js/indexPageJS/popularNews';
import './js/localStorage/localStorageHandler';
import './js/favoritesPage/favoriteNews';
import { refs } from './js/refs/refs';
import { newsGalleryMarkup } from './js/indexPageJS/popularNews';
import { checkFavorites } from './js/favoritesPage/checkIsFavorites';
import { checkRead } from './js/readPage/checkRead';
// import './js/services/pagination'  
import { sectionsHandler } from './js/indexPageJS/sectionsFilter';


if (
  window.location.pathname === '/' ||
  window.location.pathname === '/index.html'
) {
  newsGalleryMarkup();
  refs.categoriesList.addEventListener('change', sectionsHandler)

}

if (window.location.pathname === '/favorite.html') {
  checkFavorites();

}
if (window.location.pathname === '/read.html') {
  checkRead();
  refs.container.classList.add('none')
  refs.categoriesList.classList.add('none')
}