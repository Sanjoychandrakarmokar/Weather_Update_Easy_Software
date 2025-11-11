const API_KEY = "0c9c561929bd25a16b1ba650a1a14aee";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const inputBox = document.getElementById("input-box");
const searchBtn = document.getElementById("searchBtn");
const weatherBody = document.getElementById("weatherBody");

// Main function to get weather
async function getWeather(city) {
  if (!city) return;

  try {
    const res = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    const data = await res.json();

    if (data.cod !== 200) {
      weatherBody.innerHTML = `<h3 style="color:red; text-align:center;">City Not Found!</h3>`;
      return;
    }

    // Weather display
    weatherBody.innerHTML = `
      <div style="text-align:center; font-size:24px; margin-bottom:10px;">
        ${data.name}, ${data.sys.country}
      </div>

      <div style="display:flex; justify-content:center; align-items:center; gap:10px;">
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" width="80">
        <div style="font-size:45px; font-weight:bold;">${Math.round(data.main.temp)}\u00B0C</div>
      </div>
    `;

    // Weather type
    document.getElementById("weatherType").innerText = data.weather[0].main;

    // Additional info


    document.getElementById("realFeelAdditionalValue").innerText = Math.round(data.main.feels_like) + "\u00B0C";
    document.getElementById("humidityAdditionalValue").innerText = data.main.humidity + "%";
    document.getElementById("maxTemperatureAdditionalValue").innerText = Math.round(data.main.temp_max) + "\u00B0C";
    document.getElementById("minTemperatureAdditionalValue").innerText = Math.round(data.main.temp_min) + "\u00B0C";

    document.getElementById("windSpeedAdditionalValue").innerText = data.wind.speed + " m/s";
    document.getElementById("windDirectionAdditionalValue").innerText = data.wind.deg + "\u00B0";
    document.getElementById("visibilityAdditionalValue").innerText = (data.visibility / 1000) + " km";
    document.getElementById("pressureAdditionalValue").innerText = data.main.pressure + " hPa";

    document.getElementById("sunriseAdditionalValue").innerText =
      new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    document.getElementById("sunsetAdditionalValue").innerText =
      new Date(data.sys.sunset * 1000).toLocaleTimeString();

  } catch (error) {
    console.error("Error fetching weather:", error);
    weatherBody.innerHTML = `<h3 style="color:red; text-align:center;">Error fetching data</h3>`;
  }
}

// ✅ Search on button click
searchBtn.addEventListener("click", () => {
  getWeather(inputBox.value);
});

// ✅ Also search on Enter key
inputBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    getWeather(inputBox.value);
  }
});
