import { refs } from '../refs/refs';
import { ICON_HEART } from '../indexPageJS/popularNews';

export const readPageMarkup = readNews => {
  const readDates = readNews.reduce((allDates, el) => {
    allDates.push(el.readDate);
    return allDates;
  }, []);
  const folders = readDates.filter((el, index, array) => {
    return array.indexOf(el) === index;
  });
  console.log('folders', folders);

  const dailyFoldersMarkup = folders.map(el => {
    return `<div class = "dailyFolder dated=${el.toString()}"><p class="folderDate">${el.toString()}</p><ul class = "read_gallery__list"></ul></div>`;
  });

  refs.newsGallery.insertAdjacentHTML('afterbegin', dailyFoldersMarkup);
  dailyFolder = document.querySelectorAll('.dailyFolder');

  dailyPageMarkup(readNews);
};

export const dailyPageMarkup = readNewsforDay => {
  dailyFolder.forEach((day, index) => {
    const singleDayMarkup = readNewsforDay
      .map(el => {
        if (day.firstElementChild.innerText === el.readDate) {
          return `<li class="gallery__item">
    <article class="gallery__article">
              <div class="gallery__thumb"> 
                    <label class="checkbox_toFavorite-container"> Add to Favorite 
                    <input type="checkbox" name="isFavorite" class="favorite_checkbox" />
                      <svg width='16' height='16'><use class="checkmark" href="${ICON_HEART}"></use>
                    </svg>
              </label>
              
              <p class="gallery__category">${el.category}</p>
                <img class="gallery__img" src="${
                  el.src === ''
                    ? 'https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg'
                    : el.src
                }" alt="${el.alt}"/>
                        
                    </div>
                    <h3 class="gallery__header">${el.header}</h3>
                    <p class="gallery__text">${el.text}</p>
                    <div class="gallery__item-bottom_wrap">
                        <span class="gallery__date">${el.date}</span>
                        <a href="${
                          el.url
                        }" target="_blank" rel="noreferrer noopener" class="gallery__link">Read more</a>
                    </div>
                </article>
             </li>`;
        }
      })
      .join('');

    dailyFolder[index].lastElementChild.insertAdjacentHTML(
      'beforeend',
      singleDayMarkup
    );
  });

};


const collapseHandler = (e) => {
  if(e.target.className !== "folderDate") return
  console.log('e.target', e.target.nextSibling)
  const list = e.target.nextSibling;
  list.classList.toggle('collapsed')
}
refs.newsGallery.addEventListener('click', collapseHandler)