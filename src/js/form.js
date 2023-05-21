import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { searchPicturesByName } from './searchPictures';

// Notify.failure(
//   'Sorry, there are no images matching your search query. Please try again.'
// );
// Notify.success('Hooray! We found totalHits images.');
// Notify.warning("We're sorry, but you've reached the end of search results.");
//  searchName

const form = document.querySelector('.search-form');
console.dir(form);

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const inputSearch = e.target.elements.searchQuery;
  const searchName = inputSearch.value;
  console.dir(searchName);

  searchPicturesByName(searchName)
    .then(data => console.log(data))
    .catch(err => console.log(err));
}
