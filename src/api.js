export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    fetchImages() {

    const API_KEY = `27518443-a5857259e188e1fcb2dbeb9ca`;

      return  fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&webformatURL&per_page=40&page=${this.page}`)
     .then((response) => {
         if (response.ok) {
            this.page += 1;
            return response.json();
            }
            throw new Error(response.statusText);
     })
      .catch(error => console.err(error));
    }
    resetPage() {
       this.page = 1; 
    }
    get query() {
      return  this.searchQuery;
    };
    set query(newQuery) {
        this.searchQuery = newQuery;
    };
}