import { checkFavorites } from '../favoritesPage/checkIsFavorites';

export const checkboxHandler = e => {
 
  if (e.target.type !== 'checkbox') return;
  const label = e.target.previousSibling;
  e.target.checked
    ? (label.textContent = 'Remove from favorite')
    : (label.textContent = 'Add to favorite');
};
