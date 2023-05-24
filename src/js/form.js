//
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { searchPicturesByName } from './searchPictures';
import { markupGalleryPictures } from './markupGallery';
//-------
// import { onload, observer, target } from './scrollObserver';
// export { currentPage };

const form = document.querySelector('.search-form');
console.dir(form);

const galleryEl = document.querySelector('.gallery');
console.log(galleryEl);

const btnLoadMore = document.querySelector('.load-more');
console.log(btnLoadMore);

form.addEventListener('submit', onSubmit);
btnLoadMore.addEventListener('click', onLoadPic);
let data;
let searchName;
let currentPage;
let totalPage;
////

function onSubmit(e) {
  e.preventDefault();

  galleryEl.innerHTML = '';
  const inputSearch = e.target.elements.searchQuery;
  searchName = inputSearch.value;

  if (searchName === '') {
    return Notify.info('This field cannot be empty! Please, fill the field!');
  }

  searchPicturesByName(searchName)
    .then(data => {
      currentPage = 1;
      galleryEl.innerHTML = '';

      galleryEl.insertAdjacentHTML(
        'beforeend',
        markupGalleryPictures(data.hits)
      );

      // observer.observe(target);
      if (data.hits.length === 0) {
        return Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      totalPage = data.totalHits / data.hits.length;

      if (currentPage <= totalPage) {
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
      }
      btnLoadMore.hidden = false;
    })
    .catch(err => console.log(err));
}
///------------///

function onLoadPic() {
  currentPage += 1;
  searchPicturesByName(searchName, currentPage)
    .then(data => {
      galleryEl.insertAdjacentHTML(
        'beforeend',
        markupGalleryPictures(data.hits)
      );
      if (currentPage > totalPage) {
        btnLoadMore.hidden = true;
        Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(err => console.log(err));
}

//------------////

// let gallery = $('.gallery a').simpleLightbox();
// gallery.on('show.simplelightbox', function () {
//   // Do something…
// });
// const picture = document.querySelector('.photo-card');
// console.log(picture);

// async function onSubmit(e) {
//   e.preventDefault();
//   const inputSearch = e.target.elements.searchQuery;
//   const searchName = inputSearch.value;
//   console.dir(searchName);
//   try {
//     const response = await axios.get(
//       `${BASE_URL}?key=${API_KEY}&q=${searchName}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`
//     );
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }

///------------------------
// let counter = 0;
// document.addEventListener('scroll', () => {
//   counter += 1;
//   console.log(counter);
// });

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

// emptyObj = Object.assign({}, cardHeight);
// console.log(emptyObj);
// emptyObj = { ...rect };

// const { height: cardHeight } = document
//   .querySelector('.gallery')
//   .firstElementChild.getBoundingClientRect(...data.hits);

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: 'smooth',
// });

// const { height: webformatHeight } = document
//   .querySelector('.gallery')
//   .firstElementChild.getBoundingClientRect(data.height);
// window.scrollBy({
//   top: webformatHeight * 2,
//   behavior: 'smooth',
// });
