import { refs } from "../refs/refs"
import { ICON_HEART } from "../indexPageJS/popularNews"

export const favoritesPageMarkup = async (favoriteNews) => {
 
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
                 <button type="button" class="gallery__favorite__btn ">
                         <span class="favorite__btn-span">Add to favorite 
                           <svg width='16' height='16'><use href="${ICON_HEART}"></use>
                    </svg> </span>
                    <span class="favorite__btn-span remove-btn is-hidden">Remove from favorite
                                    <svg width='16' height='16'><use href="${ICON_HEART}"></use>
                    </svg></span>
                          </button>         
                    </div>
                    <h3 class="gallery__header">${el.title}</h3>
                    <p class="gallery__text">${el.description}</p>
                    <div class="gallery__item-bottom_wrap">
                        <span class="gallery__date">${el.date}</span>
                        <a href="${
                          el.url
                        }" target="_blank" rel="noreferrer noopener" class="gallery__link">Read more</a>
                    </div>
                </article>
             </li>` 

  })
   refs.favoritesGallery.insertAdjacentHTML('afterbegin', favoriteMarkup);
}