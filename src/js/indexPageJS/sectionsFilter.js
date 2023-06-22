import { refs } from '../refs/refs';
import { getNews } from '../services/fetch';
import { toPagination } from '../services/pagination';

export const getSections = async () => {
  const { results } = await getNews('/svc/news/v3/content/section-list.json');

  const selectionHeader = {
    display_name: 'Categories',
    section: 'all',
  };
  const onPageFilters = results.splice(0, 6);

  const visibleFiltersMarlup = `<form class="sections_form">
<ul class="visible_categories_list">
${onPageFilters
  .map(el => {
    return `
  <li class="visible_categories_item"><input class="radio_input" type="radio" id="${el.section}" name="categorie" value="${el.section}">
    <label class="section_label" for="${el.section}">${el.display_name}</label></li>
  `;
  })
  .join('')}
</ul>
  `;
  const sectionsMarkup = results
    .map(el => {
      return `
        <input class="radio_input" type="radio" id="${el.section}" name="categorie" value="${el.section}">
    <label class="section_label" for="${el.section}">${el.display_name}</label>
        `;
    })
    .join('');
  const sectionsFormMurkup = `
    <a href="#" class="sections_toggle-btn">${selectionHeader.display_name}</a>
    <div class="sections_wrap">
${sectionsMarkup}
</div>  

</form>
`;

  const joinedMarkup = `${visibleFiltersMarlup}${sectionsFormMurkup}`;
  refs.categoriesList.insertAdjacentHTML('afterbegin', joinedMarkup);
  console.log('width', refs.sectionsList.offsetWidth);
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
};

if (
  window.location.pathname === '/' ||
  window.location.pathname === '/index.html'
) {
refs.categoriesList.addEventListener('check', sectionsHandler);
refs.categoriesList.addEventListener('click', categoriesMenuToggler);
}


//https://api.nytimes.com/svc/news/v3/content/{source}/{section}.json

// `<form>
//   <fieldset>
//     <legend>${el.display_name}</legend>

//     <input type="radio" id="${el.section}" name="monster" value="${el.section}">
//     <label for="${el.section}">${el.display_name}</label>

//   </fieldset>
// </form>
// `;
