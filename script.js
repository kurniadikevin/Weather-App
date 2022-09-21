const mainContent = document.querySelector('.main');
const cityNameCont = document.querySelector('.city-name');
const cityContent = document.querySelector('.city-content');
const countryCode = document.querySelector('.country-code');

const weatherCont = document.querySelector('.weather');
const tempertureCont = document.querySelector('.temp');
const minTemp = document.querySelector('.min-temp');
const maxTemp = document.querySelector('.max-temp');
const humidityCont = document.querySelector('.humidity');
const seaLevelCont = document.querySelector('.sea-level');
const windCont = document.querySelector('.wind');

//new data
const localTime = document.querySelector('.local-time');


// fetch api city
function loadWeather(cityName){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=9df2b483cbf16a6965c1abe90ada9f7b&units=metric`, {mode: 'cors'})
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        console.log( response);
        console.log(response.name);

         // get gmt time  in seconds
        const gmtTimestamp = new Date().getTime();
        console.log(gmtTimestamp);
        const gmtPlus = JSON.stringify(response.timezone);
        console.log(gmtPlus);
        console.log(gmtPlus/3600)
        const locationTime = function(){
            if( (gmtPlus/3600) > 0){
                return '+' + gmtPlus/3600;
            } else{
                return  gmtPlus/3600;
            }
        }

        //convert country code
        const regionNames = new Intl.DisplayNames(
            ['en'], {type: 'region'}
          );


        cityNameCont.textContent = response.name;
        weatherCont.textContent =   (JSON.stringify(response.weather[0].description)).replace(/"/g," ");
        tempertureCont.textContent =  JSON.stringify(response.main.temp) + '℃';
        minTemp.textContent = 'Min. ' + JSON.stringify(response.main.temp_min) + '℃';
        maxTemp.textContent = 'Max. ' + JSON.stringify(response.main.temp_max) + '℃';
        humidityCont.textContent = 'Humidity. ' + JSON.stringify(response.main.humidity);
        seaLevelCont.textContent = 'Altitude. ' + JSON.stringify(response.main.sea_level)+' meter';
        windCont.textContent = 'Wind. ' +  JSON.stringify(response.wind.speed) + ' km/h';
        localTime.textContent ='Timezone. GMT '+ locationTime();
        countryCode.textContent=  regionNames.of(response.sys.country);
       


        function bgChange(){
            const body = document.querySelector('body');
            if(JSON.stringify(response.main.temp) < 30 && JSON.stringify(response.main.temp) > 20){
                body.style.cssText = 
                `background: linear-gradient(-45deg, 
                    #fed7aa,#fffbeb,
                    #94a3b8
                    );
                background-size: 400% 400%;
                animation: gradient 15s ease infinite;
                @keyframes gradient {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }`
            }else if( JSON.stringify(response.main.temp) < 20){
                body.style.cssText = 
                `background: linear-gradient(-45deg, 
                    #334155, white, 
                    #64748b
                    );
                background-size: 400% 400%;
                animation: gradient 15s ease infinite;
                @keyframes gradient {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }`
                    
            }  else if( JSON.stringify(response.main.temp) > 35){
                body.style.cssText = 
                `background: linear-gradient(-45deg, 
                    rgb(254 249 195), rgb(254 252 232),rgb(217 119 6)
                    );
                background-size: 400% 400%;
                animation: gradient 15s ease infinite;
                @keyframes gradient {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }`
            }
             else{
                body.style.cssText = 
                `background: linear-gradient(-45deg, 
                    #334155, white, 
                    #64748b
                    );
                background-size: 400% 400%;
                animation: gradient 15s ease infinite;
                @keyframes gradient {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }`
             }
        };
        bgChange();
    })
    .catch(function(error){
       const alertPopUp = document.querySelector('.alert-popup');
       alertPopUp.innerHTML= 'City or Area Not Found';
       alertPopUp.style.visibility='visible';

       // automatically hidden after 3seconds
        setTimeout(function(){
            alertPopUp.style.visibility='hidden';  
        },3000)

    })
}

loadWeather('bandung');//

const cityInput = document.querySelector('#cityInput');
const searchBtn = document.querySelector('#searchBtn');

cityInput.style.opacity='0';

searchBtn.addEventListener('click',function(){
    cityInput.style.opacity='1';
    if(cityInput.value){
     loadWeather(cityInput.value);
     cityInput.value='';
     cityInput.style.opacity='0';
    }
    });

function bgChange(){
    if(JSON.stringify(response.main.temp) < 30 && JSON.stringify(response.main.temp) > 20){
        const body = document.querySelector('body');
        body.style.backgroundColor='blue';
    }
};


//manage time
const dateTime = document.querySelector('.date-time');
const dateDate =document.querySelector('.date-date');

let time;
function setTime(){
    let today = new Date();
     dateTime.textContent=today.toLocaleTimeString();
     dateDate.textContent= today.toDateString();
} 
setInterval(setTime,1000);

