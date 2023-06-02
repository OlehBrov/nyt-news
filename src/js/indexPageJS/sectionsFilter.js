import { refs } from '../refs/refs';
import { getNews } from '../services/fetch';
import { toPagination } from '../services/pagination';

export const getSections = async () => {
  const { results } = await getNews('/svc/news/v3/content/section-list.json');

  const selectionHeader = {
    display_name: 'Categories',
    section: 'all',
  };

  await results.splice(0, 0, selectionHeader);
  const sectionsMarkup = results
    .map(el => {
      return `
        <option value="${el.section}">${el.display_name}</option>
        `;
    })
    .join('');

  refs.categoriesList.insertAdjacentHTML('afterbegin', sectionsMarkup);
};

 export const sectionsHandler = async (e) => {
    const section = e.target.value;
    const { results } = await getNews(`/svc/news/v3/content/all/${section}.json`)
    toPagination(results, 'sections')
}
// refs.categoriesList.addEventListener('change', sectionsHandler)



//https://api.nytimes.com/svc/news/v3/content/{source}/{section}.json