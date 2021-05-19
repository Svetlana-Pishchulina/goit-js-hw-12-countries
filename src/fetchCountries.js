const BASE_URL = 'https://restcountries.eu/rest/v2';

export default function fetchCountry(searchQuery) {
  return fetch(`${BASE_URL}/name/${searchQuery}`).then(response =>
    response.json(),
  );
}
