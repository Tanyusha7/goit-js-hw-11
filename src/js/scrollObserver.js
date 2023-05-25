import { searchPicturesByName } from './searchPictures';
import { markupGalleryPictures } from './markupGallery';
import { onSubmit, searchName, galleryEl, currentPage } from './form';
export { onLoad, observer, target };
////----INFINITY SCROLL OBSERVER---///
let options = {
  root: null,
  rootMargin: '500px',
  threshold: 1.0,
};
// let currentPage = 1;
const target = document.querySelector('.observer');
console.log(target);

let observer = new IntersectionObserver(onLoad, options);

function onLoad(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      currentPage += 1;
      console.log(currentPage);
      searchPicturesByName(searchName, currentPage)
        .then(data => {
          console.log(data);
          galleryEl.insertAdjacentHTML(
            'beforeend',
            markupGalleryPictures(data.hits)
          );
          if (currentPage > totalPage) {
            observer.unobserve(target);
            Notify.info(
              "We're sorry, but you've reached the end of search results."
            );
          }
        })
        .catch(err => console.log(err));
      console.log(entries);
    }
  });
}

// let counter = 0;
// document.addEventListener('scroll', () => {
//   counter += 1;
//   console.log(counter);
// });
