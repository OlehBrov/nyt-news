import { refs } from '../refs/refs';
import { ICON_HEART } from '../indexPageJS/popularNews';
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
                      <svg width='16' height='16' class="fav_swg_wrap"><use class="checkmark" href="${ICON_HEART}"></use>
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
