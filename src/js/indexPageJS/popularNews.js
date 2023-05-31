import { getNews } from '../services/fetch';
import { refs } from '../refs/refs';
export const ICON_HEART = '/sprite.f14d31f7.svg#icon-heart';

export const newsGalleryMarkup = async () => {
  const { results } = await getNews('/svc/mostpopular/v2/viewed/1.json');
  
  const markup = results.map(el => {
    const publicDate = new Date(el.published_date);
    const formattedDate = new Intl.DateTimeFormat('uk-UA').format(publicDate);
    const caption = el.media.length
      ? el.media[0].caption
      : 'Alt is not available';
    return `<li class="gallery__item">
    <article class="gallery__article">
              <div class="gallery__thumb">
              <label class="checkbox_toFavorite"> Add to Favorite
                    <input type="checkbox" name="isFavorite" class="favorite_checkbox" />
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

  refs.newsGallery.insertAdjacentHTML('afterbegin', markup);
};

const checkboxHandler = e => {
  // console.dir('target', e.target);
  if (e.target.type !== 'checkbox') return;

  // e.target.parentNode.textContent ? "Add to favorite" : "Remove from favorite"


};
refs.newsGallery.addEventListener('change', checkboxHandler);

/*  <button type="button" class="gallery__favorite__btn ">
                         <span class="favorite__btn-span">Add to favorite 
                           <svg width='16' height='16'><use href="${ICON_HEART}"></use>
                    </svg> </span>
                    <span class="favorite__btn-span remove-btn is-hidden">Remove from favorite
                                    <svg width='16' height='16'><use href="${ICON_HEART}"></use>
                    </svg></span>
                          </button>*/
