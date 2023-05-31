import { readPageMarkup } from "./readPage";



export const checkRead = () => {
const readLocal = localStorage.getItem('read-news')
  ? JSON.parse(localStorage.getItem('read-news'))
  : [];
    
   readPageMarkup(readLocal)
};
