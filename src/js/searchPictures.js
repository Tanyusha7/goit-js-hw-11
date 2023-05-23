import axios from 'axios';

export { searchPicturesByName };
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '36598866-faf31dce067f679b718909053';

function searchPicturesByName(searchName, page = 1) {
  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${searchName}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
  ).then(res => {
    console.log(res.data);
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}

// async function searchPicturesByName(searchName) {
//   try {
//     const response = await axios.get(
//       `${BASE_URL}?key=${API_KEY}&q=${searchName}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`
//     );
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// }
