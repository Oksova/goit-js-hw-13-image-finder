export default class newsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchCards() {
    const KEY = '19104689-9de2c32d2867cfd700a7c6eaf';
    const BASE_URL = 'https://pixabay.com/api/';
    return fetch(
      `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${KEY}`,
    )
      .then(response => response.json())
      .then(({ hits }) => {
        this.incrementPage();
        return hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
