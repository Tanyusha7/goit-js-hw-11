// import axios from 'axios';
// console.log(axios);
// console.log(axios.isCancel('something'));
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { searchPicturesByName } from './searchPictures';
import { markupGalleryPictures } from './markupGallery';

// Notify.failure(
//   'Sorry, there are no images matching your search query. Please try again.'
// );
// Notify.success('Hooray! We found totalHits images.');
// Notify.warning("We're sorry, but you've reached the end of search results.");
//  searchName

const form = document.querySelector('.search-form');
console.dir(form);
const galleryEl = document.querySelector('.gallery');
console.log(galleryEl);

const btnLoadMore = document.querySelector('.load-more');
console.log(btnLoadMore);

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const inputSearch = e.target.elements.searchQuery;
  const searchName = inputSearch.value;
  console.dir(searchName);

  searchPicturesByName(searchName)
    .then(data => {
      console.log(data.hits);
      galleryEl.insertAdjacentHTML(
        'beforeend',
        markupGalleryPictures(data.hits)
      );
      Notify.success(`Hooray! We found ${data.totalHits} images.`);
    })
    .catch(err => console.log(err));
}

// let gallery = $('.gallery a').simpleLightbox();
// gallery.on('show.simplelightbox', function () {
//   // Do something…
// });
