import { debounce } from 'lodash';
import { error, Stack } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';

// import { defaults } from '@pnotify/core';
import './styles.css';
import countryCardTpl from './countryCardTpl.hbs';
import countryListTpl from './countryListTpl.hbs';
import fetchCountry from './fetchCountries';
// import getRefs from './get-refs';

const inputEl = document.querySelector('input');
const cardContainer = document.querySelector('.card-container');

inputEl.addEventListener('input', debounce(onInput, 500));

function onInput(e) {
  //   const inputText = inputEl.value;
  const searchQuery = e.target.value;
  fetchCountry(searchQuery)
    .then(countries => {
      resetPage();
      if (countries.length > 10) {
        error({
          text: 'Too many matches found. Please enter a more specific query!',
          mode: 'light',
          closer: false,
          sticker: false,
          hide: false,
          stack: new Stack({
            dir1: 'right',
          }),
        });
        return;
      }
      if (countries.length < 10 && countries.length > 1) {
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
  //   error.close();
  cardContainer.innerHTML = '';
}

function onFetchError(error) {
  //   console.log(`error`);
  //   alert(`error`);
  error({
    text: 'error',
    mode: 'dark',
    closer: false,
    sticker: false,
    hide: false,
    stack: new Stack({
      dir1: 'right',
    }),
  });
}

// 1. не отлавливает ошибку
// 2. не убирается нотификашка
