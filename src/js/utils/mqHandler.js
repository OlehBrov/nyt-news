import { getSections } from '../indexPageJS/sectionsFilter';
import { paginate } from '../services/pagination';
import { renderWeather } from '../weatherWidget.js/weatherWidgetMarkup';
import { screenWidthHandler } from './screenWidthHandler';

let isFirstLoad = true;

export const currentScreen = {
  screen: '',
};

const screen = {
  mobile: window.matchMedia('(min-width: 300px)'),
  tablet: window.matchMedia('(min-width: 768px)'),
  desktop: window.matchMedia('(min-width: 1280px)'),
};

for (let [scr, mq] of Object.entries(screen)) {
  // console.log('first scr', scr)
  if (mq) mq.addEventListener('change', mqHandler);
}
export function mqHandler() {
  let size = null;
  let prevSize = null;
  for (let [scr, mq] of Object.entries(screen)) {
    if (mq.matches) {
      currentScreen.screen = scr;
    }
    if (!mq || mq.matches) {
      // console.log('mq.matches', mq.matches)
      size = scr;
      screenWidthHandler(size);
      paginate();
    } else if (scr !== size) {
    }
  }
  console.log('size before', size);
  console.log('prevSize before', prevSize);
  if (prevSize !== size && !isFirstLoad) {
    dynamicMarkup();
    prevSize = size;
    console.log('prevSize after', prevSize);
    console.log('size after', size);
  }
}

export const dynamicMarkup = prevSize => {
  console.log('dynamicMarkup fire');
  if (prevSize === null) return;
  isFirstLoad = false;
  getSections();
};
