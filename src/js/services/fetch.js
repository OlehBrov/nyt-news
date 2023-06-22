import axios from 'axios';

const baseUrl = 'https://api.nytimes.com';
const apiKey = 'TSw2QdOoFucel7ybh9h7kC4obHmkxxGl';

const lastQuery = {
  query: ''
}

export const getNews = async (endpoint, searchParams) => {
  const url = `${baseUrl}${endpoint}`;
  
    const { data } = await axios(url, {
      params: {
        "api-key": apiKey,
        "q": searchParams,
      }
    })
  lastQuery.query = searchParams;
  console.log('lastQuery', lastQuery.query)
    return data;
  
  
};

export const reFetchByDate = async (endpoint, dateFilter) => {
  const url = `${baseUrl}${endpoint}`;
  if (lastQuery.query === '') return;
    const { data } = await axios(url, {
      params: {
        "api-key": apiKey,
        "q": lastQuery.query,
        'fq': dateFilter
      }
    })

    return data;
  
}
const baseWeatherUrl = 'http://api.weatherapi.com/v1'
const weatherApiKey='48f94cc678274f729db114640230906'
export const getWeather = async ({longitude, latitude}) => {
  const url = `${baseWeatherUrl}/current.json`
  const { data } = await axios(url, {
    params: {
      'key': weatherApiKey,
      'q': `${latitude},${longitude}`,
    } 
  });
  return data;
}

// async function fetchNews(endpoint, queryParams = {}) {
//   const queryString = Object.entries(queryParams)
//     .map(([key, value]) => `${key}=${value}`)
//     .join('&');
//   const url = `${baseUrl}${endpoint}?${queryString}&api-key=${apiKey}`;
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`Failed to fetch data from ${url}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error(error);
//     throw new Error(`Failed to fetch data from ${url}`);
//   }
// }

export { fetchNews };

// Приклад використання для запиту списку категорій

// fetchNews('/svc/news/v3/content/section-list.json')
//   .then(data => {
//     console.log(data);
//     // Do something with the data
//   })
//   .catch(error => {
//     console.error(error);
//     // Handle the error
//   });

// Приклад використання для запиту статей з категорії world

// fetchNews('/svc/news/v3/content/inyt/world.json')
//   .then(data => {
//     console.log(data);
//     // Do something with the data
//   })
//   .catch(error => {
//     console.error(error);
//     // Handle the error
//   });

// Приклад використання для пошуку статей за запитом "climate change"
//  (можна використати змінну в якій зберігається слова з запитом)
//  також можна вказати номер сторінки в результаті пошуку у влативості page

// fetchNews('/svc/search/v2/articlesearch.json', {
//   q: 'climate change',
//   page: '1',
// })
//   .then(data => {
//     console.log(data);
//     // Do something with the data
//   })
//   .catch(error => {
//     console.error(error);
//     // Handle the error
//   });

// Приклад використання для запиту популярних статей

// fetchNews('/svc/mostpopular/v2/viewed/1.json', {})
//   .then(data => {
//     console.log(data);
//     // Do something with the data
//   })
//   .catch(error => {
//     console.error(error);
//     // Handle the error
//   });
