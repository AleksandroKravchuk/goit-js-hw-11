import './css/styles.css';
import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchImages } from './fetchImages';
import imagesCard from './/templates/imagesCard.hbs';
var lightbox = new SimpleLightbox('.gallery a', { /* options */ });

console.log(lightbox);

const refs = {
  searchForm: document.querySelector("#search-form"),
  btnLoadMore: document.querySelector(".load-more"),
  galeryList: document.querySelector(".gallery"),
}


refs.searchForm.addEventListener("submit", renderImages);

function renderImages(evt) {
  evt.preventDefault();
  const currentSearch = evt.currentTarget.elements.searchQuery.value.trim();
  if (!currentSearch) {
    return;
  }
  console.log(currentSearch);
  fetchImages(currentSearch).then(({ hits }) => {
    if (hits.length < 1) {
       Notify.failure("Oops, there is nothing with that name")
    }
    refs. galeryList.insertAdjacentHTML("beforeend",imagesCard(hits))
    
    //  rendrList({webformatURL,largeImageURL,tags,likes,views,comments,downloads});
    console.log(hits)
  })
    .catch(() => {
        refs.countryList.innerHTML = '';
       
  } );
 
  refs.searchForm.reset();
}
