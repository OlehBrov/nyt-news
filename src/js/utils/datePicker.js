import datepicker from 'js-datepicker';

import { refs } from '../refs/refs';
import { reFetchByDate } from '../services/fetch';
import { toPagination } from '../services/pagination';

const selector = document.querySelector('#date_picker');
const endpoint = '/svc/search/v2/articlesearch.json';


const calendarOptions = {
  formatter: (input, date, instance) => {
    const value = date.toLocaleDateString();
    input.value = value; // => '1/1/2099'
  },
  startDay: 1,
  dateSelected: new Date(),
  maxDate: new Date(),
  position: 'br',
  onSelect: async (instance, date) => {
    // Do stuff when a date is selected (or unselected) on the calendar.
    // You have access to the datepicker instance for convenience.

    const dateQuery = `pub_date:${date.toLocaleDateString('en-CA')}`;

    const { response } = await reFetchByDate(endpoint, dateQuery);
    toPagination(response.docs, 'search');
  },
  onShow: instance => {
    // Do stuff when the calendar is shown.
    // You have access to the datepicker instance for convenience.

    refs.calendarPicIcon.classList.add('calendar-is-open');
    refs.calendarToggleIcon.classList.add('calendar-is-open');
    refs.dateInput.classList.add('calendar-is-open');
  },
  onHide: instance => {
    // Do stuff once the calendar goes away.
    // You have access to the datepicker instance for convenience.
    refs.calendarPicIcon.classList.remove('calendar-is-open');
    refs.calendarToggleIcon.classList.remove('calendar-is-open');
    refs.dateInput.classList.remove('calendar-is-open');
  },
};
export const picker = datepicker(selector, calendarOptions);

refs.calendarToggleIcon.addEventListener('click', e => {
    e.stopPropagation();

    const isHidden = picker.calendarContainer.classList.contains('qs-hidden');
    picker[isHidden ? 'show' : 'hide']();
  });


