import { fetchImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
// import debounce from 'lodash.debounce';

const form = document.querySelector('#search-form');
const input = document.querySelector('#search');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more');

// form.addEventListener('submit', debounce(onSearch, 300));

let currentPage = 1;
let currentQuery = '';

form.addEventListener('submit', async event => {
  event.preventDefault();
  currentQuery = input.value.trim();
  currentPage = 1;

  if (!currentQuery) {
    iziToast.info({
      title: 'Info',
      position: 'topRight',
      message: 'Please enter a value in the search field!',
      timeout: 3000,
    });
    return;
  }

  loadMoreButton.style.display = 'none';
  loader.style.display = 'block';

  try {
    const data = await fetchImages(currentQuery, currentPage);
    loader.style.display = 'none';

    if (data.totalHits === 0) {
      iziToast.warning({
        title: 'Warning',
        position: 'topRight',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        timeout: 3000,
      });
      return;
    }

    iziToast.success({
      title: 'Success',
      position: 'topRight',
      message: `Hooray! We found ${data.totalHits} images.`,
      timeout: 3000,
    });

    document.querySelector('.gallery').innerHTML = '';
    renderGallery(data.hits);

    if (data.totalHits > data.hits.length) {
      loadMoreButton.style.display = 'block';
    }
  } catch (error) {
    loader.style.display = 'none';
    iziToast.error({
      title: 'Error',
      position: 'topRight',
      message: 'Sorry, there is no connection to the server. Please try again later!',
      timeout: 3000,
    });
  }
});

loadMoreButton.addEventListener('click', async () => {
  currentPage += 1;
  loader.style.display = 'block';

  try {
    const data = await fetchImages(currentQuery, currentPage);
    loader.style.display = 'none';

    renderGallery(data.hits);

    if (currentPage * 15 >= data.totalHits) {
      loadMoreButton.style.display = 'none';
      iziToast.info({
        title: 'Info',
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
        timeout: 3000,
      });
    }

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    loader.style.display = 'none';
    iziToast.error({
      title: 'Error',
      position: 'topRight',
      message: 'Sorry, there is no connection to the server. Please try again later!',
      timeout: 3000,
    });
  }
});