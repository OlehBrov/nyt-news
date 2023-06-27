import { refs } from '../refs/refs';
// export const ICON_HEART = '/sprite.f14d31f7.svg#icon-heart';
// import { ICON_HEART } from './popularNews';

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
                      <svg width="16" height="16" class="fav_swg_wrap" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.66683 2C2.82616 2 1.3335 3.47733 1.3335 5.3C1.3335 6.77133 1.91683 10.2633 7.65883 13.7933C7.76168 13.8559 7.87976 13.889 8.00016 13.889C8.12056 13.889 8.23864 13.8559 8.3415 13.7933C14.0835 10.2633 14.6668 6.77133 14.6668 5.3C14.6668 3.47733 13.1742 2 11.3335 2C9.49283 2 8.00016 4 8.00016 4C8.00016 4 6.5075 2 4.66683 2Z" stroke="#4440F7" stroke-linecap="round" stroke-linejoin="round"/>
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
