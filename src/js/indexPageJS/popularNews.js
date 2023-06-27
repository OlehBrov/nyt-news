import { getNews } from '../services/fetch';
import { refs } from '../refs/refs';
import { checkboxHandler } from '../utils/checkboxHandler';
// import { paginationInstance } from '../services/pagination';
import { paginate } from '../services/pagination';
import { toPagination } from '../services/pagination';
import { getSections } from './sectionsFilter';
import { currentScreenWidth } from '../utils/screenWidthHandler';
import {
  renderWeather,
  weatherWidgetMarkup,
} from '../weatherWidget.js/weatherWidgetMarkup';
import { dynamicMarkup, mqHandler } from '../utils/mqHandler';
import {
  savedLocationWeather,
  savedWeather,
} from '../services/getUserPosition';

// import { ICON_HEART } from '../../images/icons_heart.svg';
export const ICON_HEART = '/sprite.f14d31f7.svg#icon-heart';

export const newsGalleryMarkup = async () => {
  const { results } = await getNews('/svc/mostpopular/v2/viewed/1.json');
  mainPageMarkup(results);
  if (
    window.location.pathname === '/' ||
    window.location.pathname === '/index.html' ||
  window.location.pathname === '/nyt-news/' ||
  window.location.pathname === '/nyt-news/index.html'
  ) {
    dynamicMarkup();
  }
};

export const mainPageMarkup = async markupData => {
  await toPagination(markupData, 'top');
};

export const dataRender = async markupData => {
  const renderMarkup = await markupData.map(el => {
    const publicDate = new Date(el.published_date);
    const formattedDate = new Intl.DateTimeFormat('uk-UA').format(publicDate);

    const caption = el.media.length
      ? el.media[0].caption
      : 'Alt is not available';

    return `<li class="gallery__item">
    <article class="gallery__article">
              <div class="gallery__thumb">
             
              <label class="checkbox_toFavorite-container"> Add to Favorite 
                    <input type="checkbox" name="isFavorite" class="favorite_checkbox" />
                      <svg width='16' height='16' class="fav_swg_wrap"><use class="checkmark" href="./images/icons_heart.svg"></use>
                    </svg>
              </label>
                  
                   
              <p class="gallery__category">${el.section}</p>
                <img class="gallery__img" src="${
                  el.media.length === 0
                    ? 'https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg'
                    : el.media[0]['media-metadata'][2].url
                }" alt="${caption}"/>
                         
                    </div>
                    <h3 class="gallery__header">${el.title}</h3>
                    <p class="gallery__text">${el.abstract}</p>
                    <div class="gallery__item-bottom_wrap">
                    
                        <span class="gallery__date">${formattedDate}</span>
                        <a href="${
                          el.url
                        }" target="_blank" rel="noreferrer noopener" class="gallery__link">Read more</a>
                    </div>
                </article>
             </li>`;
  });
  // .join('');

  // mqHandler();
  insertWeatherWidget(renderMarkup);
  // refs.newsGallery.innerHTML = '';
  // refs.newsGallery.insertAdjacentHTML('afterbegin', await finalMarkup);
};

export const insertWeatherWidget = async markup => {
  // mqHandler();
  await currentScreenWidth.w;
  let weatherPosition = null;
  if (currentScreenWidth.w === 'mobile') {
    weatherPosition = 0;
  }
  if (currentScreenWidth.w === 'tablet') {
    weatherPosition = 1;
  }
  if (currentScreenWidth.w === 'desktop') {
    weatherPosition = 2;
  }
  markup.splice(weatherPosition, 0, weatherWidgetMarkup);
  const weatherWidgetAddedMarkup = markup.join('');

  refs.newsGallery.innerHTML = '';
  refs.newsGallery.insertAdjacentHTML('afterbegin', weatherWidgetAddedMarkup);
  // renderWeather(savedWeather)
  if (savedWeather.current) {
    savedLocationWeather(savedWeather);
  }


};
// if (
//   window.location.pathname === '/' ||
//   window.location.pathname === '/index.html'
// ) {
//   refs.newsGallery.addEventListener('change', checkboxHandler);
// }
refs.newsGallery.addEventListener('change', checkboxHandler);
