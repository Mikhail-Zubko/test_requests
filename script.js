
const search = document.querySelector('js-search')
search.addEventListener('submit', onSearch)

function onSearch(evt) {
    evt.preventDefault()
    console.log(evt.currentTarget.elements);
}

function getWeather(city, days) {

    // http://api.weatherapi.com/v1/forecast.json?key=ce2cb9b2a3da414bb5b172546231704&q=Paris
    const BASE_URL = "http://api.weatherapi.com/v1"
    const API_KEY = "ce2cb9b2a3da414bb5b172546231704"

    return fetch(
        `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=${days}`
    ).then((resp) => {
        if (!resp.ok) {
            throw new Error(resp.statusText)
        }
        return resp.json()
    })
}
getWeather("Paris", 5)
    .then((data) => console.log(data))
    .then((err) => console.log(err))