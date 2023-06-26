import { refs } from '../refs/refs';
// export const ICON_HEART = '/sprite.f14d31f7.svg#icon-heart';
import { ICON_HEART } from './popularNews';

export const sectionedMarkup = markupData => {
  const markup = markupData
    .map(el => {
      const publicDate = new Date(el.created_date);

      const formattedDate = new Intl.DateTimeFormat().format(publicDate);
    
      const imageSet = el.multimedia.reduce(
        (previousValue, currentValue, index, array) => {
          return [
            ...previousValue,
            `${currentValue.url} ${currentValue.width}w`,
          ];
        },
        []
      );
    
      const caption = el.multimedia
        ? el.multimedia[0].caption
        : 'Alt is not available';
  
      return `<li class="gallery__item">
    <article class="gallery__article">
              <div class="gallery__thumb">
             
                           <label class="checkbox_toFavorite-container"> Add to Favorite 
                    <input type="checkbox" name="isFavorite" class="favorite_checkbox" />
                      <svg width='16' height='16' class="fav_swg_wrap"><use class="checkmark" href="${ICON_HEART}"></use>
                    </svg>
              </label>
                  
                   
              <p class="gallery__category">${el.section}</p>
              
                   <img
                    srcset="${imageSet}"
                    sizes="(min-width: 1280px) 400px, (min-width: 768px) 350px, 100vw"
                    src="${el.multimedia[1].url}"
                    alt="${caption}"
/>      
                    </div>
                    <h3 class="gallery__header">${el.abstract}</h3>
                    
                    <div class="gallery__item-bottom_wrap">
                    
                        <span class="gallery__date">${formattedDate}</span>
                        <a href="${el.url}" target="_blank" rel="noreferrer noopener" class="gallery__link">Read more</a>
                    </div>
                </article>
             </li>`;
    })
    .join('');

  refs.newsGallery.innerHTML = '';
  refs.newsGallery.insertAdjacentHTML('afterbegin', markup);
};

// sizes="(min-width: 1280px) 400px, (min-width: 768px) 350px, (min-width: 300px) 280px, 100vw"
