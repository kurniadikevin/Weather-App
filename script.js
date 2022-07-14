const mainContent = document.querySelector('.main');
const cityNameCont = document.querySelector('.city-name');
const cityContent = document.querySelector('.city-content');

const weatherCont = document.querySelector('.weather')
const tempertureCont = document.querySelector('.temp');
const humidityCont = document.querySelector('.humidity');
const seaLevelCont = document.querySelector('.sea-level');

// fetch api city
function loadWeather(cityName){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=9df2b483cbf16a6965c1abe90ada9f7b&units=metric`, {mode: 'cors'})
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        console.log( response);
        console.log(response.name);
        cityNameCont.textContent = response.name;
        weatherCont.textContent = 'Weather: ' + JSON.stringify(response.weather[0].main);
        tempertureCont.textContent = 'Temperature: '+ JSON.stringify(response.main.temp) + '℃';
        humidityCont.textContent = 'Humidity: ' + JSON.stringify(response.main.humidity);
        seaLevelCont.textContent = 'Altitude: ' + JSON.stringify(response.main.sea_level)+'m';
    })
    .catch(function(error){
        alert('unknown city');
        
    })
}

loadWeather('bandung');//

const cityInput = document.querySelector('#cityInput');
const searchBtn = document.querySelector('#searchBtn');

searchBtn.addEventListener('click',function(){
     loadWeather(cityInput.value);
     cityInput.value='';
    });

