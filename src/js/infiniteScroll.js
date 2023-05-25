let options = {
  // checkLastPage: true,
  // loadOnScroll: true,
  scrollThreshold: 200,
  path: page,
  status: '.page-load-status',
  history: false,
  hideNav: '.pagination',
};

function loadNextPage() {
  let loadCount = 0;
  // pageIndex: 1;

  // let pageNumber = (loadCount + 1) * 5;
  // console.log(pageNumber);
  // return `/articles/P${pageNumber}`;
}
infScroll = new InfiniteScroll(galleryEl, options);
console.dir(infScroll);
