import axios from "axios";

export default class ApiService {
    constructor() {
      this.searchQuery = '';
      this.page = 1;
      this.per_page = 40;
    }
 async fetchImages() {
    const API_KEY = `27518443-a5857259e188e1fcb2dbeb9ca`;
    const options =  new URLSearchParams({
        key: API_KEY,
        image_type: "photo",
        q: this.searchQuery,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: this.per_page,
        page:  this.page,
        
})
    try {
      const response =await axios.get(`https://pixabay.com/api/?${options}`);
      this.page += 1;
      return response.data; }
      catch{Notify.failure(error.message);}        
  };
  
    resetPage() {
       this.page = 1; 
    }
    get query() {
      return  this.searchQuery;
    };
    set query(newQuery) {
        this.searchQuery = newQuery;
  };
   getCurrentPage() {
    return this.page;
  };
  getPer_page() {
    return this.per_page;
  }
}