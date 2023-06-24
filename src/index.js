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

import { sectionsHandler } from './js/indexPageJS/sectionsFilter';
import { mqHandler } from './js/utils/mqHandler';
import './js/localStorage/colorThemeHandler';
import { setTheme } from './js/localStorage/colorThemeHandler';
import { errorCallback, successCallback } from './js/services/getUserPosition';
import { picker } from './js/utils/datePicker';
import { currentPageLinkStyler } from './js/utils/currentPageLinkStyler';

if (
  window.location.pathname === '/' ||
  window.location.pathname === '/index.html'
) {
  newsGalleryMarkup();
  refs.categoriesList.addEventListener('change', sectionsHandler);
  currentPageLinkStyler('home');
}

if (window.location.pathname === '/favorite.html') {
  checkFavorites();
  currentPageLinkStyler('favorite');
}
if (window.location.pathname === '/read.html') {
  checkRead();
  refs.container.classList.add('none');
  currentPageLinkStyler('read');
  // refs.sectionsContainer.classList.add('none');
  // refs.calendarContainer.classList.add('calendar_none')
}
window.onload = mqHandler();
window.onload = setTheme();
// picker()
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
