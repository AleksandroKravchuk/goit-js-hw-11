import './css/styles.css';
import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchImages } from './fetchImages';
import imagesCard from './/templates/imagesCard.hbs';





const refs = {
  searchForm: document.querySelector("#search-form"),
  btnLoadMore: document.querySelector('button[type="button"]'),
  galeryList: document.querySelector(".gallery"),
  fotoCard: document.querySelector(".photo-card"),
}
 

refs.searchForm.addEventListener("submit", renderImages);

function renderImages(evt) {
  evt.preventDefault();
  refs.galeryList.innerHTML = '';
  refs.btnLoadMore.setAttribute("disabled", "");
  refs.btnLoadMore.classList.remove("load-more");
  const currentSearch = evt.currentTarget.elements.searchQuery.value.trim();
  
  if (!currentSearch) {
    return;
  }
  fetchImages(currentSearch).then(({ hits,totalHits }) => {
    if (totalHits === 0) {
      Notify.failure("Sorry, there are no images matching your search query. Please try again."); 
       
    }
    if (hits.length >= totalHits && hits.length !==0) {
      refs.galeryList.insertAdjacentHTML("beforeend", imagesCard(hits));
      Notify.warning("We're sorry, but you've reached the end of search results."); 
      refs.btnLoadMore.setAttribute("disabled","");
     refs.btnLoadMore.classList.remove("load-more");
    }
    if (hits.length < totalHits && hits.length> 1) {
      refs.galeryList.insertAdjacentHTML("beforeend", imagesCard(hits));
      Notify.success(`Hooray! We found ${totalHits} images.`);

    refs.btnLoadMore.removeAttribute("disabled");
    refs.btnLoadMore.classList.add("load-more");
      const gallery = new SimpleLightbox('.gallery a');
    gallery.options.captionsData = "alt";
    gallery.options.captionDelay = 250;
    }
  

    
    
//     hits.map((item) => {
//       const bigImg = item.largeImageURL;
      
    
//     });  
//     refs.galeryList.addEventListener('click', (evt) => {
//       evt.preventDefault();
//       const currentImg = evt.target;
//       currentImg.setAttribute("src", bigImg)
// console.log(currentImg)
//     })
  
      
  })
    .catch(() => {
        refs.galeryList.innerHTML = '';
        Notify.failure("Oops,something went wrong")
  } );
 
  refs.searchForm.reset();
}
