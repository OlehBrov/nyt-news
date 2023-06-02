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
console.log('readFromLS on top', readFromLS);

export async function toLS(e) {
  console.log('e.target', e.target);
  console.log('e.target', e.target.nodeName);

  if (e.target.nodeName === 'A') {
    console.log(
      'e.target.parentNode.parentNode.childNodes',
      e.target.parentNode.parentNode.childNodes[1].lastElementChild.src
    );
    const readObj = {
      alt: e.target.parentNode.parentNode.childNodes[1].children[1].alt,
      header: e.target.parentNode.parentNode.childNodes[3].textContent,
      src: e.target.parentNode.parentNode.childNodes[1].lastElementChild.src,
      text: e.target.parentNode.parentNode.childNodes[5].textContent,
      source:
        e.target.parentNode.parentNode.childNodes[7].lastElementChild.href,
      readDate: getUserTime(),
    };
    console.log('readFromLS inside toLS', readFromLS);
    const checked = checkIfSaved(readObj);
  }
}

export async function favoritesToLS(e) {
  if (e.target.type !== 'checkbox') return;
  const favoritesFromLS = (await localStorage.getItem('favorite-news'))
    ? JSON.parse(localStorage.getItem('favorite-news'))
    : [];

  if (e.target.checked) {
    console.log('favoritesToLS checked');
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
    console.log('added to favorites');
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
