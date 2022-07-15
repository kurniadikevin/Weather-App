const mainContent = document.querySelector('.main');
const cityNameCont = document.querySelector('.city-name');
const cityContent = document.querySelector('.city-content');

const weatherCont = document.querySelector('.weather')
const tempertureCont = document.querySelector('.temp');
const minTemp = document.querySelector('.min-temp');
const maxTemp = document.querySelector('.max-temp');
const humidityCont = document.querySelector('.humidity');
const seaLevelCont = document.querySelector('.sea-level');
const windCont = document.querySelector('.wind');

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
        weatherCont.textContent = 'Weather: ' + (JSON.stringify(response.weather[0].description)).replace(/"/g," ");
        tempertureCont.textContent = 'Temperature: '+ JSON.stringify(response.main.temp) + '℃';
        minTemp.textContent = 'Min: ' + JSON.stringify(response.main.temp_min) + '℃';
        maxTemp.textContent = 'Max: ' + JSON.stringify(response.main.temp_max) + '℃';
        humidityCont.textContent = 'Humidity: ' + JSON.stringify(response.main.humidity);
        seaLevelCont.textContent = 'Altitude: ' + JSON.stringify(response.main.sea_level)+' meter';
        windCont.textContent = 'Wind: ' +  JSON.stringify(response.wind.speed) + ' km/h';

        function bgChange(){
            const body = document.querySelector('body');
            if(JSON.stringify(response.main.temp) < 30 && JSON.stringify(response.main.temp) > 20){
                body.style.backgroundColor= '#bae6fd';
            }else if( JSON.stringify(response.main.temp) < 20){
                body.style.backgroundColor = '#e0f2fe';
            }  else if( JSON.stringify(response.main.temp) > 35){
                body.style.backgroundColor = '#ffedd5';
            }
             else{ body.style.backgroundColor='#cbd5e1';}
        };
        bgChange();
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

function bgChange(){
    if(JSON.stringify(response.main.temp) < 30 && JSON.stringify(response.main.temp) > 20){
        const body = document.querySelector('body');
        body.style.backgroundColor='blue';
    }
};

