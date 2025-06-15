
const search = document.querySelector('.js-search')
const list = document.querySelector('.js-list')

search.addEventListener('submit', onSearch)

function onSearch(evt) {
    evt.preventDefault()

    const { query, days } = evt.currentTarget.elements
    getWeather(query.value, days.value)
        .then(data => (list.innerHTML = createMarkup(data.forecast.forecastday)))
        .catch(err => console.log(err))
}


function getWeather(city, days) {
    //http://api.weatherapi.com/v1/forecast.json?key=ce2cb9b2a3da414bb5b172546231704&q=Paris&days=5
    const BASE_URL = 'http://api.weatherapi.com/v1';
    const API_KEY = 'ce2cb9b2a3da414bb5b172546231704';
    // const params  = new URLSearchParams({
    //key : API_KEY,
    //q : city,
    //days : days,
    //lang : 'uk'
    //})

    return fetch(
        //`${BASE_URL}/forecast.json?${params}`
        `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=${days}&lang=uk`

    ).then((resp) => {
        if (!resp.ok) {
            throw new Error(resp.statusText);
        }

        return resp.json();
    });
}

function createMarkup(arr) {
    return arr.map(({ date, day: { avgtemp_c, condition: { icon, text } } }) => `<li>
        <img src="${icon}" alt="${text}">
<p>${text}</p>
<h2>${date}</h2>
<h3>${avgtemp_c}</h3>
</li>`).join('')
}
