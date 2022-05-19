const API_KEY = `27518443-a5857259e188e1fcb2dbeb9ca`;

 export function fetchImages(name) {
      return fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&webformatURL`)
     .then((response) => {
         if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
     })
      .catch(error => console.err(error));
};
