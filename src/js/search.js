import { refs } from './refs/refs';
import { getNews } from './services/fetch';
import {searchResultsMarkup} from './indexPageJS/searchResultsMarkup'
import { paginate, toPagination } from './services/pagination';


const endpoint = '/svc/search/v2/articlesearch.json'
const searchFieldToggler = () => {
    refs.searchForm.classList.remove('seach_form-hide');
    refs.openSearchFieldButton.classList.add('openSearchFieldButton-hidden')
   
}
refs.openSearchFieldButton.addEventListener('click', searchFieldToggler)
const searchHandler = async (e) => {
    e.preventDefault();
    const query = e.target.elements.search_query.value;
    const { response } = await getNews(endpoint, query);
    // searchResultsMarkup(response.docs)
    toPagination(response.docs, 'search')
    // paginate()

}
refs.searchForm.addEventListener('submit', searchHandler)