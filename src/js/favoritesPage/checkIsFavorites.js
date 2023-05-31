import { favoritesPageMarkup } from "./favoriteNews";

export const checkFavorites = () => {
  const favoritesLocal = localStorage.getItem('favorite-news')
    ? JSON.parse(localStorage.getItem('favorite-news'))
        : [];
    
   favoritesPageMarkup(favoritesLocal)
};
