import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import countryInfo from './templates/countryInfo.hbs';
import countryList from './templates//countryList.hbs';

const DEBOUNCE_DELAY = 300;
const refs = {
  onInput: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
}


refs.onInput.addEventListener('input', debounce(onInput,DEBOUNCE_DELAY));

function onInput(evt) {
  const currentCountry = evt.target.value.trim();

  if (currentCountry.length === 0) { 
    return;
   }
  fetchCountries(currentCountry)
    .then(appendContriesArray) 
    .catch(() => {
        refs.countryList.innerHTML = '';
        Notify.failure("Oops, there is no country with that name")
  } )
}

function appendContriesArray(contriesArray) {
console.log(contriesArray)
  if (contriesArray.length > 10) {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    return Notify.info('Too many matches found. Please enter a more specific name.');
}
  if (contriesArray.length === 1) {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    refs.countryInfo.insertAdjacentHTML('beforeend', countryInfo(contriesArray[0]));
    
  } if (contriesArray.length >= 2 && contriesArray.length <= 10) {
    refs.countryInfo.innerHTML = '';
    refs.countryList.insertAdjacentHTML('beforeend', countryList(contriesArray)); 
  }
    
}




// OLLD SCHOOL

// function onInput(evt) {
//   const currentCountry = evt.target.value.trim();

//   if (currentCountry.length === 0 ) { 
//     return;
//    }
//     fetchCountries(currentCountry).then((contriesArray) => {
     
//     if (contriesArray.length > 10) {
//     refs.countryList.innerHTML = '';
//     refs.countryInfo.innerHTML = '';
//        (Notify.info("Too many matches found. Please enter a more specific name."));
//     }
//     if (contriesArray.length >= 2 && contriesArray.length <= 10) {
//       renderCountriesItem(contriesArray);
//     }
//     if (contriesArray.length === 1) {
//     refs.countryList.innerHTML = '';
//       renderCountryInfo(contriesArray);
//       };
//   })
//   .catch((error) =>  (Notify.failure("Oops, there is no country with that name"))
//   )

  
// }

// function renderCountriesItem(contriesArray) {
// refs.countryInfo.innerHTML = '';
// refs.countryList.innerHTML = '';
//  return contriesArray.forEach(element => {
//     const name = element.name.official;
//     const flag = element.flags.svg;
//     const markup = `
//     <h3><img src=${flag} width = 40> ${name}</h3>
// `;
//    refs.countryList.insertAdjacentHTML('beforeend',markup)
//   });
// }

// function renderCountryInfo(contriesArray) {
// refs.countryInfo.innerHTML = '';
// refs.countryList.innerHTML = '';
//     const name = contriesArray[0].name.official;
//     const capital = contriesArray[0].capital[0];
//     const population = contriesArray[0].population;
//     const flag = contriesArray[0].flags.svg;
//     const language = Object.values(contriesArray[0].languages).join(', ');
//     const markup = `
//     <h2><img src=${flag} width = 80> ${name}</h2>
//     <ul>
//     <li><p>Capital: <span>${capital}</span> </p></li>
//     <li><p>Population: <span> ${population}</span></p></li>
//     <li><p>Languages: <span>${language}</span> </p></li>
//     </ul>
// `;
//     refs.countryInfo.insertAdjacentHTML('beforeend', markup);
// }

