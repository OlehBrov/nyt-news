import { getSections } from '../indexPageJS/sectionsFilter';
import { moveThemeSwitcher } from '../services/moveThemeSwitcherPosition';
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
  if (mq) mq.addEventListener('change', mqHandler);
}
export function mqHandler() {
  console.log('mq handler run')
  let size = null;
  let prevSize = null;
  for (let [scr, mq] of Object.entries(screen)) {
    if (mq.matches) {
      currentScreen.screen = scr;

      isFirstLoad && moveThemeSwitcher(scr);
    }
    if (!mq || mq.matches) {
      size = scr;
      screenWidthHandler(size);
      paginate();
    } else if (scr !== size) {
    }
  }

  if (prevSize !== size && !isFirstLoad) {
    dynamicMarkup();
    moveThemeSwitcher(size);
    prevSize = size;
  }
}

export const dynamicMarkup = prevSize => {
  if (prevSize === null) return;
  isFirstLoad = false;
  getSections();
};
