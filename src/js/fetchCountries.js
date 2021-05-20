const BASE_URL = 'https://restcountries.eu/rest/v2';
function fetchCountries(country) {
    const url = `${BASE_URL}/name/${country}`;
    return fetch(url).then(response => response.json());
}

export default {fetchCountries}



