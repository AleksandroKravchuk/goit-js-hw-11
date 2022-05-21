import './css/styles.css';
import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import  ApiService from './api';
import imagesCard from './/templates/imagesCard.hbs';

const apiData = new ApiService();
const gallery = new SimpleLightbox('.gallery a');
    gallery.options.captionsData = "alt";
    gallery.options.captionDelay = 250;
const refs = {
  searchForm: document.querySelector("#search-form"),
  btnLoadMore: document.querySelector('.load-more'),
  galeryList: document.querySelector(".gallery")
}
 
refs.searchForm.addEventListener("submit", renderImages);
refs.btnLoadMore.addEventListener('click', onLoadMore);

function renderImages(evt) {
  evt.preventDefault();
  refs.galeryList.innerHTML = '';
  apiData.query = evt.currentTarget.elements.searchQuery.value.trim();
  apiData.resetPage();
  disable(); 
  if (!apiData.query) {
    return;
  }
   apiData.fetchImages()
    .then(({ hits, totalHits }) => {
    if (totalHits === 0) {
      Notify.failure("Sorry, there are no images matching your search query. Please try again.");      
    }
    if (hits.length >= totalHits && hits.length !==0) {
      refs.galeryList.insertAdjacentHTML("beforeend", imagesCard(hits));
      notShow();
      Notify.warning("We're sorry, but you've reached the end of search results."); 
    }
    if (hits.length < totalHits && hits.length> 1) {
      refs.galeryList.insertAdjacentHTML("beforeend", imagesCard(hits));
      Notify.success(`Hooray! We found ${totalHits} images.`);
      btnLoadMoreShow();
      enable();
      gallery.refresh();
    }
  })
    .catch(() => {
        refs.galeryList.innerHTML = '';
        Notify.failure("Oops,something went wrong")
  } );
 
  refs.searchForm.reset();
}

// Load MORE
function onLoadMore() {
  apiData.fetchImages().then(({ hits }) => {
    refs.galeryList.insertAdjacentHTML("beforeend", imagesCard(hits));
    gallery.refresh();
    const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
    if (hits.length<39) {
      notShow();
      Notify.warning("We're sorry, but you've reached the end of search results."); 
    }
  });

}
  
function btnLoadMoreShow() {
   refs.btnLoadMore.removeAttribute("hidden");   
  };  
function notShow() {
  refs.btnLoadMore.setAttribute("hidden", "");
  
};
    function disable() {
     refs.btnLoadMore.setAttribute("disabled", "");
};
  function enable() {
    refs.btnLoadMore.removeAttribute("disabled");  
};
    