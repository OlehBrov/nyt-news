export const weatherWidgetMarkup = `<li class="gallery__item"><div class="weather">

</div></li>`;

export const renderWeather = async weatherData => {
  const dateOptions = {
    weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' 
  }
  const wData = await weatherData;
 
  const weatherContainer = await document.querySelector('.weather');
  const [date, time] = wData.location.localtime.split(" ")
  const newDate = new Date(date)
  const formattedDate =  newDate.toLocaleDateString('en-US', dateOptions)
  // const day = newDate.weekday
  const [weekDay, month, year] = formattedDate.split(", ")
  
  const weatherMarkup = `
    <div class="weather_wrap">
    <div class="temp_wrap"><p class="weather_degree">${wData.current.temp_c}\u00B0</p></div>
    
    <div class="weather_part">
    <p class="weather_character gallery__text">${wData.current.condition.text}</p>
    <button type="button" class="weather_location"><p class="weather_country"></p>${wData.location.name}</p></button>
        </div>
                </div>
    <img src=${wData.current.condition.icon} width="121" class="weather_image">
<p class="weather_character week_day">${weekDay}</p>
    <p class="weather_character alighn">${month}, ${year}</p>
            <button type="button" class="weather_week-btn">weather for week</button>
    `;

  if (weatherContainer !== null) {
    weatherContainer.innerHTML = '';
    weatherContainer.insertAdjacentHTML('afterbegin', weatherMarkup);
  }


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
