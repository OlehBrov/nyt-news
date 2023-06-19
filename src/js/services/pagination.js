import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { dataRender } from '../indexPageJS/popularNews';
import { refs } from '../refs/refs';
import { favoritesPageMarkup } from '../favoritesPage/favoriteNews';
import { searchResultsMarkup } from '../indexPageJS/searchResultsMarkup';
import { sectionedMarkup } from '../indexPageJS/sectionsMarkup';
import { currentScreenWidth } from '../utils/screenWidthHandler';
import { renderWeather } from '../weatherWidget.js/weatherWidgetMarkup';
import { savedLocationWeather } from './getUserPosition';
import { savedWeather } from './getUserPosition';

const container = document.getElementById('tui-pagination-container');

const options = {
  totalItems: 20,
  itemsPerPage: 7,
  visiblePages: 4,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',

  getItemsPerPage() {
    return this.itemsPerPage;
  },

  getTotal() {
    return this.totalItems;
  },
  setItemsPerPage(numberOfItems) {
    return (this.itemsPerPage = numberOfItems);
  },
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

  getData() {
    return this.data
  },
  getKey() {
    return this.key
  }
};

export const toPagination = async (renderMarkup, parentKey) => {
  newsData.setKey(parentKey);
  newsData.setData(renderMarkup);

  await paginationInstance.setTotalItems(renderMarkup.length);

  paginate();
};
export const paginate = async () => {
  const currentPage = paginationInstance.getCurrentPage();
  const findEndIdx = () => {
    if (currentScreenWidth.w === 'mobile') {
      let start = null;
      let end = null;
      paginationInstance.setItemsPerPage(4);
      return {
        start: 4 * currentPage - 4,
        end: 4 * currentPage
      };
    }
    if (currentScreenWidth.w === 'tablet') {
      let start = null;
      let end = null;
      paginationInstance.setItemsPerPage(7);
      return {
        start: 7 * currentPage - 7,
        end: 7 * currentPage
      };;
    }
    if (currentScreenWidth.w === 'desktop') {
      let start = null;
      let end = null;
      paginationInstance.setItemsPerPage(8);
      return {
        start: 8 * currentPage - 8,
        end: 8 * currentPage
      };
    }
  };

  const news = newsData.getData()
  const newsKey = newsData.getKey()
  const { start, end } = findEndIdx(); 
  const markupPaginated = await news.slice(start, end);



  if (newsKey === 'top') dataRender(markupPaginated);
  if (newsKey === 'search') searchResultsMarkup(markupPaginated);
  if (newsKey === 'sections') {
    sectionedMarkup(markupPaginated);
  }
  if (newsKey === 'favorites') {
    favoritesPageMarkup(markupPaginated);
  }
};

paginationInstance.on('afterMove', event => {
  const { page } = event;
  paginate();
  const totalItems = options.getTotal();
  const perPage = options.getItemsPerPage();

  if (page === Math.ceil(totalItems / perPage)) {
    return false;
  }
});

// paginationInstance.on('beforeMove', event => {
//   const currentPage = event.page - 1;
//   const totalItems = options.getTotal();
//   const perPage = options.getItemsPerPage();
//   console.log('currentPage', currentPage)
//   console.log('Math.ceil(totalItems / perPage)', Math.ceil(totalItems / perPage))
//   if (currentPage === Math.ceil(totalItems / perPage)) {
//     return false;
//     // return true;
//   }
// });
