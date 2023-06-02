import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { dataRender } from '../indexPageJS/popularNews';
import { refs } from '../refs/refs';
import { favoritesPageMarkup } from '../favoritesPage/favoriteNews';
import { searchResultsMarkup } from '../indexPageJS/searchResultsMarkup';
import { sectionedMarkup } from '../indexPageJS/sectionsMarkup';

console.log('pagination');

const container = document.getElementById('tui-pagination-container');

const options = {
  totalItems: 20,
  itemsPerPage: 4,
  visiblePages: 4,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
};

export const paginationInstance = new Pagination(container, options);
const newsData = {
  data: [],
  key: '',

  setData(news) {
    this.data = news;
  },
  setKey(keyString) {
    this.key = keyString;
  },
};
export const toPagination = async (renderMarkup, parentKey) => {
  newsData.setKey(parentKey);
  newsData.setData(renderMarkup);
  await paginationInstance.setTotalItems(renderMarkup.length);
  await paginationInstance.setItemsPerPage(4);
  options.totalItems = renderMarkup.length;
  paginationInstance.reset();

  paginate();
};
export const paginate = async () => {
  const currentPage = paginationInstance.getCurrentPage();

  const startIdx = options.itemsPerPage * currentPage - options.itemsPerPage;
  const endIdx = options.itemsPerPage * currentPage;
  const markupPaginated = await newsData.data.slice(startIdx, endIdx);

  if (newsData.key === 'top') dataRender(markupPaginated);
  if (newsData.key === 'search') searchResultsMarkup(markupPaginated);
  if (newsData.key === 'sections') {
    sectionedMarkup(markupPaginated);
  }
  if (newsData.key === 'favorites') {
    favoritesPageMarkup(markupPaginated);
  }
};

paginationInstance.on('afterMove', event => {
  const { page } = event.page;
  paginate();
  if (page === Math.ceil(options.totalItems / options.itemsPerPage)) {
    return false;
  }
});
