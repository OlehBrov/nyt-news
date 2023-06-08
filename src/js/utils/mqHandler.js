import { paginate } from "../services/pagination";
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
  console.log('mqHandler')
  for (let [scr, mq] of Object.entries(screen)) {
    if (!mq || mq.matches) {
      size = scr;
      screenWidthHandler(size)
      paginate()
    } else if (scr !== size) {console.log('src', scr)};
  }
}

