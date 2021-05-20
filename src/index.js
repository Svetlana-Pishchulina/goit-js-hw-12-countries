import { debounce } from 'lodash';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';

import './styles.css';
import countryCardTpl from './countryCardTpl.hbs';
import countryListTpl from './countryListTpl.hbs';
import fetchCountry from './fetchCountries';

const inputEl = document.querySelector('input');
const cardContainer = document.querySelector('.card-container');

inputEl.addEventListener('input', debounce(onInput, 500));

function onInput(e) {
  //   const inputText = inputEl.value;
  resetPage();
  const searchQuery = e.target.value;
  fetchCountry(searchQuery)
    .then(countries => {
      if (countries.length > 10) {
        error({
          text: 'Too many matches found. Please enter a more specific query!',
          mode: 'light',
          closer: true,
          sticker: false,
          hide: true,
          delay: 2000,
        });
        return;
      }
      if (countries.length <= 10 && countries.length > 1) {
        renderCountriesList(countries);
        return;
      }
      if (countries.length === 1) {
        renderCountryCard(countries);
        return;
      }
    })
    .catch(onFetchError);
}

function renderCountryCard(country) {
  const contryCardMarkup = countryCardTpl(country);
  cardContainer.innerHTML = contryCardMarkup;
}

function renderCountriesList(countries) {
  const contriesList = countryListTpl(countries);
  cardContainer.innerHTML = contriesList;
}

function resetPage() {
  cardContainer.innerHTML = '';
}

function onFetchError(err) {
  error({
    text: `${err}`,
    mode: 'dark',
    closer: true,
    sticker: false,
    hide: true,
    delay: 2000,
  });
}
