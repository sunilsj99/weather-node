console.log('client side JS file loaded');

const weatherForm = document.querySelector('form')
const searchQuery = document.querySelector('input')
const m1 = document.querySelector('.forcast')
const m2 = document.querySelector('.errorMessage')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    m1.textContent = 'Loading...'
    m2.textContent = ''

    const location = searchQuery.value

    console.log(location)

    if (location === '') {
        return console.log('Provide an address')
    }

    const fetchURL = '/weather?address=' + location

    fetch(fetchURL).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                m1.textContent = "Error : " + data.error
            } else {
                m2.textContent = "Currently weather is " + data.forcast.type + " with " + data.forcast.temperature +
                    " degree centigrade and " + data.forcast.rain_chance + "% rain chance."
                m1.textContent = "Address : " + data.place_name
            }
        })
    })
})