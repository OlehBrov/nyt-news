import {refs} from './refs/refs';


const searchFieldToggler = () => {
    refs.searchForm.classList.remove('seach_form-hide');
    refs.openSearchFieldButton.classList.add('openSearchFieldButton-hidden')
   
}
refs.openSearchFieldButton.addEventListener('click', searchFieldToggler)