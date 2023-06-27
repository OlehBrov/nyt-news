import {
  getFiltersFromLocalStorage,
  saveFiltersToLocalStorage,
} from '../localStorage/localStorageHandler';
import { refs } from '../refs/refs';
import { getNews } from '../services/fetch';
import { toPagination } from '../services/pagination';
import { currentScreenWidth } from '../utils/screenWidthHandler';

export const getSections = async () => {

  const filters = {
    sectionFilters: [],
  };
  const {data} = await getNews('/svc/news/v3/content/section-list.json');
  if (data) {
    filters.sectionFilters = await data.results;
    saveFiltersToLocalStorage(data.results);
  }
  if (!data) {
    filters.sectionFilters = await getFiltersFromLocalStorage();

  }

  const selectionHeader =
    currentScreenWidth.w === 'mobile' ? 'Categories' : 'Others';
  // const selectionHeader = {
  //   display_name: 'Others',
  //   section: 'all',
  // };
  const devidedResults = {
    onPageFilters: [],
    onDropdownFilters: [],
  };
  if (currentScreenWidth.w === 'tablet') {
    devidedResults.onPageFilters = await filters.sectionFilters.splice(0, 4);
    devidedResults.onDropdownFilters = await filters.sectionFilters.splice(4);
  }
  if (currentScreenWidth.w === 'desktop') {
    devidedResults.onPageFilters = await filters.sectionFilters.splice(0, 6);
    devidedResults.onDropdownFilters = await filters.sectionFilters.splice(6);
  }

  const mobileViewFiltersMarkup = `
<form class="sections_form">
    <a href="#" class="sections_toggle-btn">Categories<span class="sections_btn-arrow">></span></a>
    <div class="sections_wrap">
${filters.sectionFilters
  .map(el => {
    return `
   <input class="radio_input" type="radio" id="${el.section}" name="categorie" value="${el.section}">
    <label class="section_label" for="${el.section}">${el.display_name}</label>
  `;
  })
  .join('')}
</div>  
</form>
  `;

  const visibleFiltersMarlup = `<form class="sections_form">
<ul class="visible_categories_list">
${devidedResults.onPageFilters
  .map(el => {
    return `
  <li class="visible_categories_item"><input class="radio_input" type="radio" id="${el.section}" name="categorie" value="${el.section}">
    <label class="section_label" for="${el.section}">${el.display_name}</label></li>
  `;
  })
  .join('')}
</ul>
  `;
  const sectionsMarkup = devidedResults.onDropdownFilters
    .map(el => {
      return `
        <input class="radio_input" type="radio" id="${el.section}" name="categorie" value="${el.section}">
    <label class="section_label" for="${el.section}">${el.display_name}</label>
        `;
    })
    .join('');

  const sectionsFormMurkup = `
    <a href="#" class="sections_toggle-btn">Others<span class="sections_btn-arrow">></span></a>
    <div class="sections_wrap">
${sectionsMarkup}
</div>  

</form>
`;

  const joinedMarkup =
    currentScreenWidth.w === 'mobile'
      ? mobileViewFiltersMarkup
      : `${visibleFiltersMarlup}${sectionsFormMurkup}`;
  refs.categoriesList.innerHTML = '';
  refs.categoriesList.insertAdjacentHTML('afterbegin', joinedMarkup);
};

export const sectionsHandler = async e => {
  const section = e.target.value;

  const { results } = await getNews(`/svc/news/v3/content/all/${section}.json`);

  e.target.parentNode.classList.remove('sections_wrap-open');
  toPagination(results, 'sections');
};

const categoriesMenuToggler = e => {
  if (e.target.nodeName !== 'A') return;

  e.target.parentNode.lastElementChild.classList.toggle('sections_wrap-open');

  if (currentScreenWidth.w === 'mobile') {
    e.target.parentNode.childNodes[1].lastElementChild.classList.toggle(
      'arrow-sections-is-open'
    );
    e.target.parentNode.childNodes[1].classList.toggle('sections-is-open');
  } else {
    e.target.parentNode.childNodes[3].lastElementChild.classList.toggle(
      'arrow-sections-is-open'
    );
    e.target.parentNode.childNodes[3].classList.toggle('sections-is-open');
  }
};

if (
  window.location.pathname === '/' ||
  window.location.pathname === '/index.html' ||
  window.location.pathname === '/nyt-news/' ||
  window.location.pathname === '/nyt-news/index.html'
) {
  refs.categoriesList.addEventListener('check', sectionsHandler);
  refs.categoriesList.addEventListener('click', categoriesMenuToggler);
}
