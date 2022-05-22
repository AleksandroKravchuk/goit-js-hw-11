export function renderMarkup( hits,  container) {
    const markup = hits.map(({largeImageURL,webformatURL,tags,likes,views,comments,downloads}) => {
 return  `<a href=${largeImageURL}>
  <div class="photo-card">
  <img src=${webformatURL}  alt=${tags} loading="lazy" width=300/>
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>
</a>
        `
    }).join('');
    container.insertAdjacentHTML("beforeend", markup);
}