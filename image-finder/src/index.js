import './styles.css';
import cardTpl from '../src/templates/cardTpl.hbs';
import newsApiService from '../src/apiService.js';
import loadMoreBtn from '../src/loadMoreBtn.js';

const refs = {
  searchFormEl: document.querySelector('#search-form'),
  cardContainer: document.querySelector('.gallery'),
};

const LoadMoreBtn = new loadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const NewsApiService = new newsApiService();

refs.searchFormEl.addEventListener('submit', onSearch);
LoadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  NewsApiService.query = e.currentTarget.elements.query.value;

  if (NewsApiService.query === '') {
    return info({
      text: 'Enter the value!',
      delay: 1500,
      closerHover: true,
    });
  }

  LoadMoreBtn.show();
  NewsApiService.resetPage();
  clearCardContainer();
  fetchCards();
}

function fetchCards() {
  LoadMoreBtn.disable();
  return NewsApiService.fetchCards().then(images => {
    appendCardsMarkup(images);
    LoadMoreBtn.enable();
    if (images.length === 0) {
      LoadMoreBtn.hide();
      error({
        text: 'No matches found!',
        delay: 1500,
        closerHover: true,
      });
    }
  });
}

function appendCardsMarkup(images) {
  refs.cardContainer.insertAdjacentHTML('beforeend', cardTpl(images));
}

function clearCardContainer() {
  refs.cardContainer.innerHTML = '';
}

function onLoadMore() {
  fetchCards()
    .then(
      setTimeout(() => {
        window.scrollBy({
          top: document.documentElement.clientHeight - 100,
          behavior: 'smooth',
        });
      }, 1000),
    )
    .catch(err => console.log(err));
}
