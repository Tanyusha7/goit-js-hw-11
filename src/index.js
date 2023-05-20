// key = 36598866 - faf31dce067f679b718909053;
import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.failure(
  'Sorry, there are no images matching your search query. Please try again.'
);
Notify.success('Hooray! We found totalHits images.');
Notify.warning("We're sorry, but you've reached the end of search results.");
