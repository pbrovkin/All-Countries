//function to generate countries by default
generateCountries(countries);

//oninput event if the value of the <input> element is changed
document.querySelector('input').oninput = function () {
    document.getElementById('error').textContent = '';
    main();
}

//onclick event to reverse displayed countries 
document.getElementById('reverse').onclick = function () {
    let displayedCountries = document.getElementsByClassName('country-block').length;
    document.querySelector('.countries-container').textContent = '';
    if (displayedCountries === countries.length) {
        generateCountries(countries.reverse());
    } else {
        generateCountries(filtered.reverse());
    }
}

//main function occurs when the input element gets user input
function main() {

    //empty container before generating search results
    document.querySelector('.countries-container').textContent = '';

    //reading all the input values
    let inputVal = document.getElementById('input').value;
    let searchBy = document.getElementById('search-values').value;
    let searchParam = document.getElementById('search-params').value;

    //check input value is valid
    checkInputVal(inputVal);

    //condition that calling generate function based on parameters from input fields
    if (searchParam === 'start-letters') {
        generateCountries(startsWithVal(searchBy, inputVal));
    } else if (searchParam === 'includ-letters') {
        generateCountries(includesVal(searchBy, inputVal));
    }
}


//function to generate country blocks getting data from an array of objects
function generateCountries(arr) {
    arr.forEach((country) => {
        let block = document.createElement('div');
        block.className = 'country-block';
        block.innerHTML = `
        <div><img src="${country.flag}" alt="flag"></div>
        <div class="country-data">
            <div>Name: ${country.name}</div>
            <div>Capital: ${country.capital}</div>
            <div>Languages: ${country.languages}</div>
            <divn>Population: ${country.population}</div>
        </div>`;
        document.querySelector('.countries-container').append(block);
    });
    //show searching results
    searchResults(arr);
}

//supporting array to reverse filtered objects 
let filtered = [];


//conditions to filter out the array based on starting letters
function startsWithVal(par, val) {
    switch (par) {
        case 'name':
            filtered = countries.filter(country => country.name.toLowerCase().startsWith(val.toLowerCase()));
            break;
        case 'capital':
            filtered = countries.filter(country => country.capital.toLowerCase().startsWith(val.toLowerCase()));
            break;
        case 'language':
            filtered = countries.filter(country => country.languages[0].toLowerCase().startsWith(val.toLowerCase()));
            break;
        case 'population':
            filtered = countries.filter(country => country.population <= Number(val));
            break;
    }
    return filtered;
}

//conditions to filter out the array based on including letters
function includesVal(par, val) {
    switch (par) {
        case 'name':
            filtered = countries.filter(country => country.name.toLowerCase().includes(val.toLowerCase()));
            break;
        case 'capital':
            filtered = countries.filter(country => country.capital.toLowerCase().includes(val.toLowerCase()));
            break;
        case 'language':
            filtered = countries.filter(country => country.languages.join().includes(val.toLowerCase()));
            break;
        case 'population':
            filtered = countries.filter(country => country.population <= Number(val));
            break;
    }
    return filtered;
}


/* function itemsToLowerCase(item) {
    return item.toLowerCase();
} */

//function to show searching results below the input field
function searchResults(arr) {
    if (arr.length === 1) {
        document.getElementById('results').innerHTML = `${arr.length} country found`;
    } else {
        document.getElementById('results').innerHTML = `${arr.length} countries found`;
    }
}

//function to check the input value is correct, shows error message if not valid 
function checkInputVal(val) {
    let searchBy = document.getElementById('search-values').value;
    if (searchBy !== 'population') {
        let patt = /^[a-zA-Z\s]*$/;
        if (patt.test(val)) {
            return true;
        } else {
            document.getElementById('error').innerHTML = 'ERROR: Enter valid value';
        }
    } else {
        let patt = /([1-9][0-9]*)|0/;
        if (patt.test(val)) {
            return true;
        } else {
            document.getElementById('error').innerHTML = 'ERROR: Enter valid value';
        }
    }
}


