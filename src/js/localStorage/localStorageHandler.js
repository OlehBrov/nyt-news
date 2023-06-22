import { refs } from '../refs/refs';

if (
  window.location.pathname === '/' ||
  window.location.pathname === '/index.html'
) {
  refs.newsGallery.addEventListener('click', toLS);
  refs.newsGallery.addEventListener('click', favoritesToLS);
}

if (window.location.pathname === '/read.html') {
  refs.newsGallery.addEventListener('click', favoritesToLS);
}

const readFromLS = localStorage.getItem('read-news')
  ? JSON.parse(localStorage.getItem('read-news'))
  : [];


export async function toLS(e) {

  if (e.target.nodeName === 'A') {
    const readObj = {
      alt: e.target.parentNode.parentNode.childNodes[1].children[1].alt,
      header: e.target.parentNode.parentNode.childNodes[3].textContent,
      category: e.target.parentNode.parentNode.childNodes[1].childNodes[3].textContent,
      src: e.target.parentNode.parentNode.childNodes[1].lastElementChild.src,
      text: e.target.parentNode.parentNode.childNodes[5].textContent,
      source:
        e.target.parentNode.parentNode.childNodes[7].lastElementChild.href,
      date: e.target.parentNode.parentNode.parentNode.lastElementChild.lastElementChild.firstElementChild.textContent,
      readDate: getUserTime(),
    };
   
    const checked = checkIfSaved(readObj);
  }
}

export async function favoritesToLS(e) {
  if (e.target.type !== 'checkbox') return;
  const favoritesFromLS = (await localStorage.getItem('favorite-news'))
    ? JSON.parse(localStorage.getItem('favorite-news'))
    : [];

  if (e.target.checked) {

    const favoriteObj = {
      title:
        e.target.parentNode.parentNode.parentNode.childNodes[3].textContent,
      img: e.target.parentNode.parentNode.parentNode.childNodes[1]
        .lastElementChild.src,
      alt: e.target.parentNode.parentNode.parentNode.childNodes[1].children[1]
        .alt,
      category: e.target.parentNode.parentNode.childNodes[1].innerText,
      description:
        e.target.parentNode.parentNode.parentNode.childNodes[5].textContent,
      date: e.target.parentNode.parentNode.parentNode.lastElementChild
        .children[0].textContent,
      src: e.target.parentNode.parentNode.parentNode.lastElementChild
        .lastElementChild.href,
      favorite: 'true',
      source:
        e.target.parentNode.parentNode.parentNode.lastElementChild
          .lastElementChild.href,
    };

    favoritesFromLS.push(favoriteObj);
    await localStorage.setItem(
      'favorite-news',
      JSON.stringify(favoritesFromLS)
    );

  }

  if (!e.target.checked) {
    const source =
      e.target.parentNode.parentNode.parentNode.lastElementChild
        .lastElementChild.href;
    const index = favoritesFromLS.findIndex(el => {
      return el.src === source;
    });
    favoritesFromLS.splice(index, 1);
    await localStorage.setItem(
      'favorite-news',
      JSON.stringify(favoritesFromLS)
    );
  }
}

function getUserTime(t = new Date()) {
  let Y = t.getFullYear();
  let M = addLeadingZero(t.getMonth() + 1);
  let D = addLeadingZero(t.getDate());
  return `${D}/${M}/${Y}`;
}
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function checkIfSaved(toSaveObj) {
  if (readFromLS.length === 0) {
    saveReadtoLS(readFromLS, toSaveObj);
    return;
  }

  const duplicateIndex = readFromLS.findIndex(
    el => el.source === toSaveObj.source
  );
  if (duplicateIndex === -1) {
    saveReadtoLS(readFromLS, toSaveObj);
    return;
  }
  readFromLS.splice(duplicateIndex, 1, toSaveObj);
  localStorage.setItem('read-news', JSON.stringify(readFromLS));
}

const saveReadtoLS = (newsArray, newsObj) => {
  newsArray.push(newsObj);
  localStorage.setItem('read-news', JSON.stringify(newsArray));
};

// async function checkIfFavorite({ src }, local) {
//   return (index = local.findIndex(el => {
//     return el.src === src;
//   }));
// }
export async function saveFiltersToLocalStorage(data) {
  localStorage.setItem('filters', JSON.stringify(data));
}
export async function getFiltersFromLocalStorage() {
 return JSON.parse(localStorage.getItem('filters'))
}