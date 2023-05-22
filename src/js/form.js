// import axios from 'axios';
// console.log(axios);
// console.log(axios.isCancel('something'));
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
const gallery = document.querySelector('.gallery');
console.log(gallery);

const btnLoadMore = document.querySelector('.load-more');
console.log(btnLoadMore);

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const inputSearch = e.currentTarget.elements.searchQuery;
  const searchName = inputSearch.value;
  console.dir(searchName);

  searchPicturesByName(searchName)
    .then(data => {
      console.log(data);
      return (gallery.innerHTML = markupGalleryPictures(data));
    })
    .catch(err => {
      console.log(err);
    });
}

function markupGalleryPictures(arr) {
  return arr
    .map(({ webformatURL, tags, likes, views, comments, downloads }) => {
      `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${downloads}
    </p>
  </div>
</div>`;
    })
    .join('');
}
