import { getNews } from '../services/fetch';
import { refs } from '../refs/refs';
import { checkboxHandler } from '../utils/checkboxHandler';
import { paginationInstance } from '../services/pagination';
import { paginate } from '../services/pagination';
import { toPagination } from '../services/pagination';
import { getSections } from './sectionsFilter';
export const ICON_HEART = '/sprite.f14d31f7.svg#icon-heart';

export const newsGalleryMarkup = async () => {
  const { results } = await getNews('/svc/mostpopular/v2/viewed/1.json');
  mainPageMarkup(results);
  getSections()
};

export const mainPageMarkup = async markupData => {
  // paginationInstance.setTotalItems(markupData.length);
  // paginationInstance.setItemsPerPage(5);
  await toPagination(markupData, 'top');
  paginate(markupData);
};

export const dataRender = async markupData => {
// console.log('dataRender fires')
  const renderMarkup = await markupData
    .map(el => {
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
                      <svg width='16' height='16'><use class="checkmark" href="${ICON_HEART}"></use>
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
    })
    .join('');

  refs.newsGallery.innerHTML = '';
  refs.newsGallery.insertAdjacentHTML('afterbegin', renderMarkup);
};

// if (
//   window.location.pathname === '/' ||
//   window.location.pathname === '/index.html'
// ) {
//   refs.newsGallery.addEventListener('change', checkboxHandler);
// }
 refs.newsGallery.addEventListener('change', checkboxHandler);