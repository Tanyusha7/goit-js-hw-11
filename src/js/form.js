//
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { searchPicturesByName, pageNext } from './searchPictures';
import { markupGalleryPictures } from './markupGallery';

const form = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');

form.addEventListener('submit', onSubmit);
btnLoadMore.addEventListener('click', onLoadPic);

let data;
let searchName;
let currentPage;
let totalPage;
let gallery;

async function onSubmit(e) {
  try {
    e.preventDefault();

    galleryEl.innerHTML = '';
    btnLoadMore.hidden = true;
    const inputSearch = e.target.elements.searchQuery;
    searchName = inputSearch.value.trim();

    if (searchName === '') {
      btnLoadMore.hidden = true;
      return Notify.info('This field cannot be empty! Please, fill the field!');
    }
    const data = await searchPicturesByName(searchName);
    currentPage = 1;
    galleryEl.innerHTML = '';

    galleryEl.insertAdjacentHTML('beforeend', markupGalleryPictures(data.hits));

    gallery = new SimpleLightbox('.photo-card a');

    // observer.observe(target);
    if (data.total === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    if (data.total > 40) {
      btnLoadMore.hidden = false;
    }

    if (data.total > 1) {
      return Notify.success(`Hooray! We found ${data.totalHits} images.`);
    }
  } catch (error) {
    console.log(err);
  }
}
///------------///

async function onLoadPic() {
  try {
    currentPage += 1;

    const data = await searchPicturesByName(searchName, currentPage);

    galleryEl.insertAdjacentHTML('beforeend', markupGalleryPictures(data.hits));

    gallery = new SimpleLightbox('.photo-card a');
    gallery.refresh();
    if (data.hits.length < 40) {
      btnLoadMore.hidden = true;
      return Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    console.log(err);
  }
}

// function onScroll() {
//   if (galleryEl.firstChild === null) {
//     return;
//   }
//   const { height } = document
//     .querySelector('.gallery')
//     .firstElementChild.getBoundingClientRect();

//   window.scrollBy({
//     top: height * 2,
//     behavior: 'smooth',
//   });
// }

///------------------------

////----INFINITY SCROLL OBSERVER---///
// let options = {
//   root: null,
//   rootMargin: '500px',
//   threshold: 1.0,
// };

// const target = document.querySelector('.observer');
// console.log(target);

// let observer = new IntersectionObserver(onLoad, options);

// function onLoad(entries, observer) {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       currentPage += 1;
//       console.log(currentPage);
//       searchPicturesByName(searchName, currentPage)
//         .then(data => {
//           console.log(data);
//           galleryEl.insertAdjacentHTML(
//             'beforeend',
//             markupGalleryPictures(data.hits)
//           );
//           if (currentPage > totalPage) {
//             observer.unobserve(target);
//             Notify.info(
//               "We're sorry, but you've reached the end of search results."
//             );
//           }
//         })
//         .catch(err => console.log(err));
//       console.log(entries);
//     }
//   });
// }
