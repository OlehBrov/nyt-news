import { favoritesPageMarkup } from "./favoriteNews";
export const removeFavorite = async (e) => {
    
    const link = e.target.parentNode.parentNode.parentNode.lastElementChild.lastElementChild.href;
    const favoritesFromLS = (await localStorage.getItem('favorite-news'))
    ? JSON.parse(localStorage.getItem('favorite-news'))
        : [];
    
    const index = favoritesFromLS.findIndex(el => {
      return el.src === link;
    });

    favoritesFromLS.splice(index, 1);
    await localStorage.setItem(
      'favorite-news',
      JSON.stringify(favoritesFromLS)
    );

    favoritesPageMarkup(favoritesFromLS);
}