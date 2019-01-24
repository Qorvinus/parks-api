'use strict'

// NPS base url https://api.nps.gov/api/v1/parks

const apiKey = "6oTwGsu85qFINL0GpGfcB1mEQp3QAEtUR1wc3bVf"

const searchUrl = "https://api.nps.gov/api/v1/parks"


function findSubmit() {
  $('form').submit(event => {
    event.preventDefault();
    const state = $('#js-states-search').val();
    const maxResults = $('#js-max-results').val();
    getParks(state, maxResults);
  });
}

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function getParks(state, maxResults) {
  const params = {
    stateCode: state,
    limit: maxResults,
    start: 0,
    key: apiKey
  };
  const queryString = formatQueryParams(params)
  const url = searchUrl + '?' + queryString;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => renderParks(responseJson, maxResults))
    .catch(err => {
      $('.js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function renderParks(responseJson, maxResults) {
  $('#js-results-list').empty();
  $('#js-error-message').empty();
  for (let i = 0; i < responseJson.data.length & i < maxResults; i++) {
  $('#js-results-list').append(
    `<li><h3>${responseJson.data[i].fullName}</h3></li>
    <li><p>${responseJson.data[i].description}</p></li>
    <li><p><a href=${responseJson.data[i].url}>${responseJson.data[i].url}</a></p></li>`
    )};
  $('.js-search-results').removeClass('hidden');
}

$(findSubmit);