import { toPagination } from "../services/pagination";
import { favoritesPageMarkup } from "./favoriteNews";

export const checkFavorites = () => {
  const favoritesLocal = localStorage.getItem('favorite-news')
    ? JSON.parse(localStorage.getItem('favorite-news'))
        : [];
    toPagination(favoritesLocal, 'favorites')
  //  favoritesPageMarkup(favoritesLocal)
};
