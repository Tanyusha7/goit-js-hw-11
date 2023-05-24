export function onScroll() {
  const { height } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();
  //   console.log(height);

  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
