import { themeSwitcherPosition } from './themeSwitcher';

export const currentScreenWidth = {
  w: null,
};
export const screenWidthHandler = size => {
  themeSwitcherPosition(size);

  return (currentScreenWidth.w = size);
};
