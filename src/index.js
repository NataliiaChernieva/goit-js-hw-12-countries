import './sass/main.scss';
import _debounce from '../node_modules/lodash.debounce';
import API from './js/fetchCountries';
import countryCardTmp from './templates/country-card.hbs';
import contriesTmp from './templates/contries.hbs';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const refs = {
    inputEl: document.querySelector('.inputCountry'),
    cardContainer: document.querySelector('.js-card-container'),
}

refs.inputEl.addEventListener('input', _debounce(() => {
    let inputedCountry = refs.inputEl.value;
    //console.log('inputedCountry :>> ', inputedCountry);
    
    API.fetchCountries(inputedCountry)
       .then(renderCountryCard)
       .catch(onFetchError)
       //.finally();

}, 500))

function renderCountryCard(data) {
    if(data.length===1){
        const markup = countryCardTmp(data);
        console.log('markup :>> ', markup);
        refs.cardContainer.innerHTML = markup;
        resetInput();
    } else if (data.length > 1 && data.length <= 10) {
        const markupContries = contriesTmp(data);
        refs.cardContainer.innerHTML = markupContries;
    } else {
        // alert('Необходимо сделать запрос более специфичным');
        // PNotify.error ({
        //     text: 'Необходимо сделать запрос более специфичным'
        // });

        const myError = error ( {   
        text: 'Необходимо сделать запрос более специфичным'
        } ) ;
    }
}

function onFetchError() {
    alert('Упс, Такой страны нет в списке')
}

function resetInput() {
    refs.inputEl.value = '';
}