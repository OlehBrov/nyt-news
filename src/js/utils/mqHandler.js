import { createPaginationInstance, paginate } from "../services/pagination";
import { renderWeather } from "../weatherWidget.js/weatherWidgetMarkup";
import { screenWidthHandler } from "./screenWidthHandler";

const screen = {
  mobile: window.matchMedia('(min-width: 300px)'),
  tablet: window.matchMedia('(min-width: 768px)'),
  desktop: window.matchMedia('(min-width: 1280px)'),
};

for (let [scr, mq] of Object.entries(screen)) {

  if (mq) mq.addEventListener('change', mqHandler);
}
export function mqHandler() {

  for (let [scr, mq] of Object.entries(screen)) {
    if (!mq || mq.matches) {
      size = scr;
      screenWidthHandler(size)
      paginate()
      // createPaginationInstance(size)
      // renderWeather()
    } else if (scr !== size) {console.log('src', scr)};
  }
}

