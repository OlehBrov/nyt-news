import './js/search';
import './js/refs/refs';
import './js/mobileMenu';
import './js/indexPageJS/popularNews';
import './js/localStorage/localStorageHandler';
import './js/favoritesPage/favoriteNews';
import { newsGalleryMarkup } from './js/indexPageJS/popularNews';
import { checkFavorites } from './js/favoritesPage/checkIsFavorites';
import { checkRead } from './js/readPage/checkRead';

if (
  window.location.pathname === '/' ||
  window.location.pathname === '/index.html'
) {
  newsGalleryMarkup();
}

if (window.location.pathname === '/favorite.html') {
  checkFavorites();
}
if (window.location.pathname === '/read.html') {
    checkRead();
}