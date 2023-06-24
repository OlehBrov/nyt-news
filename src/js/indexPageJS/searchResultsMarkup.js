import { refs } from '../refs/refs';
export const ICON_HEART = '/sprite.f14d31f7.svg#icon-heart';

export const searchResultsMarkup = markupData => {
  
  const markup = markupData.map(el => {
    const publicDate = new Date(el.pub_date);

    const formattedDate = new Intl.DateTimeFormat().format(publicDate);
    const caption = el.multimedia.length
      ? el.multimedia[0].caption
      : 'Alt is not available';
    const imgSource =
      el.multimedia.length === 0
        ? 'https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg'
        : `https://static01.nyt.com/${el.multimedia[0].url}`;
    return `<li class="gallery__item">
    <article class="gallery__article">
              <div class="gallery__thumb">
             
              <label class="checkbox_toFavorite-container"> Add to Favorite 
                    <input type="checkbox" name="isFavorite" class="favorite_checkbox" />
                      <svg width='16' height='16' class="fav_swg_wrap"><use class="checkmark" href="${ICON_HEART}"></use>
                    </svg>
              </label>
                  
                   
              <p class="gallery__category">${el.section_name}</p>
                <img class="gallery__img" src="${imgSource}" alt="${caption}"/>
                         
                    </div>
                    <h3 class="gallery__header">${el.abstract}</h3>
                    <p class="gallery__text">${el.lead_paragraph}</p>
                    <div class="gallery__item-bottom_wrap">
                    
                        <span class="gallery__date">${formattedDate}</span>
                        <a href="${el.web_url}" target="_blank" rel="noreferrer noopener" class="gallery__link">Read more</a>
                    </div>
                </article>
             </li>`;
  }).join('');

  refs.newsGallery.innerHTML = '';
  refs.newsGallery.insertAdjacentHTML('afterbegin', markup);
};

//<img alt="A domed building flying a Russian flag rises behind the red
//brick outer wall of the Kremlin, with a watchtower on the right."
//class="css - rq4mmj"
//src = "https://static01.nyt.com/images/2023/05/24/multimedia/24dc-kremlin-drone-02-lvgq/24dc-kremlin-drone-02-lvgq-articleLarge.jpg?quality=75&amp;auto=webp&amp;disable=upscale"
//srcset = "https://static01.nyt.com/images/2023/05/24/multimedia/24dc-kremlin-drone-02-lvgq/24dc-kremlin-drone-02-lvgq-articleLarge.jpg?quality=75&amp;auto=webp 600w,
//https://static01.nyt.com/images/2023/05/24/multimedia/24dc-kremlin-drone-02-lvgq/24dc-kremlin-drone-02-lvgq-jumbo.jpg?quality=75&amp;auto=webp 1024w,
//https://static01.nyt.com/images/2023/05/24/multimedia/24dc-kremlin-drone-02-lvgq/24dc-kremlin-drone-02-lvgq-superJumbo.jpg?quality=75&amp;auto=webp 2048w"
//sizes = "((min-width: 600px) and (max-width: 1004px)) 84vw, (min-width: 1005px) 60vw, 100vw" decoding = "async" width = "600" height = "391" style = "cursor: pointer;" >
