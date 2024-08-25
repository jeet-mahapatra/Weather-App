const apiKey ="a1a87831fe4fd6570c21b93ef3592d8a"


const weatherDataEle = document.querySelector(".weather-data");
const cityNameEle = document.querySelector("#city-name");
const formEle = document.querySelector("form");
const imgIcon = document.querySelector(".icon")
const currentValue = document.querySelector(".current")
const date = currentValue.querySelector(".date")
const time = currentValue.querySelector(".time")

formEle.addEventListener("submit", function(e){
// console.log(cityNameEle.value);
e.preventDefault()
const cityValue = cityNameEle.value;

getWeatherData(cityValue)
})

async function getWeatherData(cityValue){
    try {
        const responce = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`)
        if (!responce.ok){
            throw new Error ("Network responce is not ok!")
        }
        const data =  await responce.json();
        console.log(data);

        const temprature = Math.floor(data.main.temp)
        const description = data.weather[0].description
        const icon = data.weather[0].icon

        weatherDataEle.querySelector(".temp").textContent = `${temprature}°C`
        weatherDataEle.querySelector(".desc").textContent = `${description}`
        imgIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="">`
      
        const details = weatherDataEle.querySelector(".details")

        // const feelsLike = Math.floor(data.main.feels_like)

        // details.querySelector(".feels_like").textContent = `Feels Like :${feelsLike}°C`

        const detailsArray = [
            `Feels Like : ${Math.floor(data.main.feels_like)}°C`,
            `Humidity : ${data.main.humidity}%`,
            `Wind Speed : ${data.wind.speed} m/s`
        ]

        details.innerHTML = detailsArray.map((d)=>{
            return `<div>${d}</div>`
        }).join("")

        function currentDate(second) {
            // Convert seconds to milliseconds
            let date = new Date(second);
            
            // Get the date and time components
            let year = date.getFullYear();
            let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
            let day = date.getDate().toString().padStart(2, '0');
            // let hours = date.getHours().toString().padStart(2, '0');
            // let minutes = date.getMinutes().toString().padStart(2, '0');
            // let secondsPart = date.getSeconds().toString().padStart(2, '0');
        
            // Return the formatted date and time string
            return `${day}-${month}-${year}`;
        }

        date.textContent = `Date : ${currentDate(Date.now())}`


        function currentTime(second) {
            // Convert seconds to milliseconds
            let date = new Date(second);
            
            // Get the date and time components
            // let year = date.getFullYear();
            // let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
            // let day = date.getDate().toString().padStart(2, '0');
            let hours = date.getHours().toString().padStart(2, '0');
            let minutes = date.getMinutes().toString().padStart(2, '0');
            // let secondsPart = date.getSeconds().toString().padStart(2, '0');
        
            // Return the formatted date and time string
            return `${hours}:${minutes}`;
        }

        time.textContent = `Time : ${currentTime(Date.now())}`


        const sun = weatherDataEle.querySelector(".sun")



        function sunrise(sunriseSecond) {
            // Convert seconds to milliseconds
            let date = new Date(sunriseSecond * 1000);
            
            // Get the date and time components
            // let year = date.getFullYear();
            // let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
            // let day = date.getDate().toString().padStart(2, '0');
            let hours = date.getHours().toString().padStart(2, '0');
            let minutes = date.getMinutes().toString().padStart(2, '0');
            let secondsPart = date.getSeconds().toString().padStart(2, '0');
        
            // Return the formatted date and time string
            return `${hours}:${minutes}:${secondsPart}`;
        }

        let sunriseTime = (sunrise(data.sys.sunrise))
        console.log(sunriseTime);
        


        function sunset(sunsetSecond) {
            // Convert seconds to milliseconds
            let date = new Date(sunsetSecond * 1000);
            
            // Get the date and time components
            // let year = date.getFullYear();
            // let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
            // let day = date.getDate().toString().padStart(2, '0');
            let hours = date.getHours().toString().padStart(2, '0');
            let minutes = date.getMinutes().toString().padStart(2, '0');
            let secondsPart = date.getSeconds().toString().padStart(2, '0');
        
            // Return the formatted date and time string
            return `${hours}:${minutes}:${secondsPart}`;
        }

        let sunsetTime = (sunset(data.sys.sunset))
        console.log(sunsetTime);

        const sunTime = [
            `Sunrise : ${sunriseTime}`,
            `Sunset : ${sunsetTime}`
        ]

        

        const jumra =sun.innerHTML = sunTime.map((s)=>{
            return `<div>${s}</div>`
        }).join("")

        console.log(jumra);
        
        
        
        
    }catch(err){
        weatherDataEle.querySelector(".temp").textContent = " "
        imgIcon.innerHTML = " "
        weatherDataEle.querySelector(".desc").textContent = "An Error Occured !Check your Input."
        console.log(err);
        
    };
    
   
 
    


}
