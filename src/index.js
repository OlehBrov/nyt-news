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
import './js/localStorage/colorThemeHandler'
import { setTheme } from './js/localStorage/colorThemeHandler';
import { errorCallback, successCallback } from './js/services/getUserPosition';
import { picker } from './js/utils/datePicker';



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
  refs.sectionsContainer.classList.add('none');
  // refs.calendarContainer.classList.add('calendar_none')
}
window.onload = mqHandler();
window.onload = setTheme();
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
