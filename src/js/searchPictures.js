export { searchPicturesByName };
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '36598866-faf31dce067f679b718909053';

function searchPicturesByName(searchName) {
  fetch(
    `${BASE_URL}?key=${API_KEY}&q=${searchName}&image_type=photo&orientation=horizontal&safesearch=true`
  ).then(res => {
    console.log(res);
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}
