import './sass/main.scss';
import _debounce from '../node_modules/lodash.debounce';
import API from './js/fetchCountries';
import countryCardTmp from './templates/country-card.hbs';
import contriesTmp from './templates/contries.hbs';
import * as PNotify from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const refs = {
    inputEl: document.querySelector('.inputCountry'),
    cardContainer: document.querySelector('.js-card-container'),
}

refs.inputEl.addEventListener('input', _debounce(() => {
    let inputedCountry = refs.inputEl.value;
    //console.log('inputedCountry :>> ', inputedCountry);
    if (!inputedCountry) return;
    API.fetchCountries(inputedCountry)
        .then(renderCountryCard)
        .catch(onFetchError)
}, 500))

function renderCountryCard(data) {
    console.log('data :>> ', data);
    if(data.length===1){
        const markup = countryCardTmp(data);
        console.log('markup :>> ', markup);
        refs.cardContainer.innerHTML = markup;
        //resetInput();
    } else if (data.length > 1 && data.length <= 10) {
        const markupContries = contriesTmp(data);
        refs.cardContainer.innerHTML = markupContries;
    } else if(data.length > 10){
        resetPage();
        PNotify.error ({
            text: 'Необходимо сделать запрос более специфичным'
        });
   }
}

function onFetchError() {
    PNotify.error({
        text: 'Упс, Такой страны нет в списке'
    })
}

// function resetInput() {
//     refs.inputEl.value = '';
// }

function resetPage (){
    refs.cardContainer.innerHTML =''
}