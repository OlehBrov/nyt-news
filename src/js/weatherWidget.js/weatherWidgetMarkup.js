export const weatherWidgetMarkup = `<li><div class="weather">

</div></li>`;

export const renderWeather = async weatherData => {
  const wData = await weatherData;
  console.log('wData', wData);
  const weatherContainer = await document.querySelector('.weather');

  const weatherMarkup = `
    <div class="weather_wrap">
    <p class="weather_degree">${wData.current.temp_c}</p>
    <div class="weather_part">
    <p class="weather_character gallery__text">${wData.current.condition.text}</p>
    <button type="button" class="weather_location"><p class="weather_country"></p>${wData.location.name}</p></button>
        </div>
                </div>
    <img src=${wData.current.condition.icon} width="121" class="weather_image">
    <p class="weather_character alighn">${wData.location.localtime}</p>
            <button type="button" class="weather_week"><p class="">weather for week</p></button>
    `;
  console.log('weatherContainer', weatherContainer);
  if (weatherContainer !== null) {
  weatherContainer.innerHTML = '';
  weatherContainer.insertAdjacentHTML('afterbegin', weatherMarkup);
}
  
  console.log('end');
};

/* 
<div class="weather_wrap">
<p class="weather_degree">23&deg</p>
<div class="weather_part">
<p class="weather_character gallery__text">Sunny</p>
<button type="button" class="weather_location"><p class="weather_country"></p>West Jakarta</p></button>
</div>
</div>
<img src="../images/Sun.png" width="121" class="weather_image">
<p class="weather_character alighn">Mon<br>
21 Jan 2021</p>
<button type="button" class="weather_week"><p class="">weather for week</p></button>

*/
