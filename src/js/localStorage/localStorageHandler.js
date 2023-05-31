import { refs } from '../refs/refs';

if (
  window.location.pathname === '/' ||
  window.location.pathname === '/index.html'
) {
  refs.newsGallery.addEventListener('click', toLS);
  refs.newsGallery.addEventListener('click', favoritesToLS);
}

const readFromLS = localStorage.getItem('read-news')
  ? JSON.parse(localStorage.getItem('read-news'))
  : [];

export function toLS(e) {
  if (e.target.nodeName === 'A' || e.target.className === 'favorite__btn-span') {
    
  }
  if (e.target.nodeName !== 'A') {
    return;
  }

  const readObj = {
    alt: e.target.parentNode.parentNode.childNodes[1].children[1].alt,
    header: e.target.parentNode.parentNode.childNodes[3].textContent,
    src: e.target.parentNode.parentNode.childNodes[1].children[1].src,
    text: e.target.parentNode.parentNode.childNodes[5].textContent,
    readDate: getUserTime(),
  };

  checkIfSaved(readObj);
  readFromLS.push(readObj);

  localStorage.setItem('read-news', JSON.stringify(readFromLS));
}

export async function favoritesToLS(e) {
  if (e.target.className !== 'favorite__btn-span') return;

  const favoritesFromLS = (await localStorage.getItem('favorite-news'))
    ? JSON.parse(localStorage.getItem('favorite-news'))
    : [];

  const favoriteObj = {
    title: e.target.parentNode.parentNode.parentNode.childNodes[3].textContent,
    img: e.target.parentNode.parentNode.childNodes[3].attributes.src.nodeValue,
    alt: e.target.parentNode.parentNode.parentNode.childNodes[1].children[1].alt,
    category: e.target.parentNode.parentNode.childNodes[1].innerText,
    description:
      e.target.parentNode.parentNode.parentNode.childNodes[5].textContent,
    date: e.target.parentNode.parentNode.parentNode.lastElementChild.children[0]
      .textContent,
    src: e.target.parentNode.parentNode.parentNode.lastElementChild
      .lastElementChild.href,
    favorite: 'true',
    source:
      e.target.parentNode.parentNode.lastElementChild.children[1].attributes[0]
        .value,
  };

  const index = await checkIfFavorite(favoriteObj, favoritesFromLS);
  if (index === -1) {
    favoritesFromLS.push(favoriteObj);
    await localStorage.setItem(
      'favorite-news',
      JSON.stringify(favoritesFromLS)
    );
  } else console.log("This article is already in favorites")

  // favoritesPageMarkup(favoritesFromLS)
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

function checkIfSaved(readObj) {
  readFromLS.map((el, currentIndex) => {
    if (readObj.src === el.src) {
      return readFromLS.splice(currentIndex, 1);
    }
    return;
  });
}

async function checkIfFavorite({ src }, local) {
  return (index = local.findIndex(el => {
    return el.src === src;
  }));
  //  return favoritesFromLS.push(favoriteObj)
  //   const index = favoritesFromLS.find((el, index) => {
  //     favoriteObj.src === el.src;
  //       return index;
  //   });
  //     console.log('index', index)
}
