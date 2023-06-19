import { refs } from '../refs/refs';
export const ICON_HEART = '/sprite.f14d31f7.svg#icon-heart';

export const sectionedMarkup = markupData => {
  const markup = markupData
    .map(el => {
      const publicDate = new Date(el.created_date);

      const formattedDate = new Intl.DateTimeFormat().format(publicDate);

      const caption = el.multimedia
        ? el.multimedia[0].caption
        : 'Alt is not available';
      const imgSource =
        el.multimedia && el.multimedia.length
          ? `${el.multimedia[1].url}`
          : 'https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg';
      return `<li class="gallery__item">
    <article class="gallery__article">
              <div class="gallery__thumb">
             
              <label class="checkbox_toFavorite-container"> Add to Favorite 
                    <input type="checkbox" name="isFavorite" class="favorite_checkbox" />
                      <svg width='16' height='16'><use class="checkmark" href="${ICON_HEART}"></use>
                    </svg>
              </label>
                  
                   
              <p class="gallery__category">${el.section}</p>
                <img class="gallery__img" src="${imgSource}" alt="${caption}"/>
                         
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
