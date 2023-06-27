import datepicker from 'js-datepicker';

import { refs } from '../refs/refs';
import { reFetchByDate } from '../services/fetch';
import { toPagination } from '../services/pagination';

const endpoint = '/svc/search/v2/articlesearch.json';
console.log('selector in date picker', refs.pickerContainer);
const calendarOptions = {
  formatter: (input, date, instance) => {
    const value = date.toLocaleDateString();
    input.value = value;
  },
  startDay: 1,
  dateSelected: new Date(),
  maxDate: new Date(),
  position: 'br',
  onSelect: async (instance, date) => {
    const dateQuery = `pub_date:${date.toLocaleDateString('en-CA')}`;

    const { response } = await reFetchByDate(endpoint, dateQuery);
    toPagination(response.docs, 'search');
  },
  onShow: instance => {
    refs.calendarPicIcon.classList.add('calendar-is-open');
    refs.calendarToggleIcon.classList.add('calendar-is-open');
    refs.dateInput.classList.add('calendar-is-open');
  },
  onHide: instance => {
    refs.calendarPicIcon.classList.remove('calendar-is-open');
    refs.calendarToggleIcon.classList.remove('calendar-is-open');
    refs.dateInput.classList.remove('calendar-is-open');
  },
};

const picker = datepicker(refs.pickerContainer, calendarOptions);

refs.calendarToggleIcon.addEventListener('click', e => {
  e.stopPropagation();

  const isHidden = picker.calendarContainer.classList.contains('qs-hidden');
  picker[isHidden ? 'show' : 'hide']();
});
