import { refs } from './refs/refs';
import { getNews } from './services/fetch';
import { searchResultsMarkup } from './indexPageJS/searchResultsMarkup';
import { paginate, toPagination } from './services/pagination';
import { currentScreen } from './utils/mqHandler';

const endpoint = '/svc/search/v2/articlesearch.json';
const searchFieldToggler = () => {
  refs.searchForm.classList.remove('search_form-hide');
  refs.openSearchFieldButton.classList.add('openSearchFieldButton-hidden');
};
refs.openSearchFieldButton.addEventListener('click', searchFieldToggler);
const searchHandler = async e => {
  e.preventDefault();
  const query = e.target.elements.search_query.value;
  const { response } = await getNews(endpoint, query);
  if (currentScreen.w === 'mobile') {
    refs.searchForm.classList.add('search_form-hide');
    refs.openSearchFieldButton.classList.remove('openSearchFieldButton-hidden');
  }

  toPagination(response.docs, 'search');
  refs.searchInput.value = '';
  // e.target.elements.search_query
};
refs.searchForm.addEventListener('submit', searchHandler);
