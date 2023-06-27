import { refs } from '../refs/refs';
// import { ICON_HEART } from '../indexPageJS/popularNews';
import { removeFavorite } from './removeFavorites';

export const favoritesPageMarkup = async favoriteNews => {
  const favoriteMarkup = favoriteNews.map(el => {
    return `<li class="gallery__item">
    <article class="gallery__article">
              <div class="gallery__thumb"> <p class="gallery__category">${
                el.category
              }</p>
                <img class="gallery__img" src="${
                  el.img === ''
                    ? 'https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg'
                    : el.img
                }" alt="${el.alt}"/>
              <label class="checkbox_toFavorite-container"> Remove from favorite 
                    <input type="checkbox" name="isFavorite" class="favorite_checkbox" checked/>
                     <svg width="16" height="16" class="fav_swg_wrap" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.66683 2C2.82616 2 1.3335 3.47733 1.3335 5.3C1.3335 6.77133 1.91683 10.2633 7.65883 13.7933C7.76168 13.8559 7.87976 13.889 8.00016 13.889C8.12056 13.889 8.23864 13.8559 8.3415 13.7933C14.0835 10.2633 14.6668 6.77133 14.6668 5.3C14.6668 3.47733 13.1742 2 11.3335 2C9.49283 2 8.00016 4 8.00016 4C8.00016 4 6.5075 2 4.66683 2Z" stroke="#4440F7" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
              </label>
                    </div>
                    <h3 class="gallery__header">${el.title}</h3>
                    <p class="gallery__text">${el.description}</p>
                    <div class="gallery__item-bottom_wrap">
                        <span class="gallery__date">${el.date}</span>
                        <a href="${
                          el.src
                        }" target="_blank" rel="noreferrer noopener" class="gallery__link">Read more</a>
                    </div>
                </article>
             </li>`;
  }).join('');
  // refs.favoritesGallery.innerHTML = '';
  // refs.favoritesGallery.insertAdjacentHTML('afterbegin', favoriteMarkup);
  // refs.favoritesGallery.addEventListener('change', removeFavorite);

  refs.newsGallery.innerHTML = '';
  refs.newsGallery.insertAdjacentHTML('afterbegin', favoriteMarkup);
  refs.newsGallery.addEventListener('change', removeFavorite);
};
