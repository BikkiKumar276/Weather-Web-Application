const apiKey = "733baa6b2114fa9e63ae1eb53703e228";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";


const inputBox = document.querySelector("#inputBtn");
const searchBtn = document.querySelector("#button");
const weatherIcon = document.querySelector("#tempImg");
const mainImg = document.querySelector(".hero-sec");
const newsSec = document.querySelector(".about-weather");
const modeToggle = document.querySelector("#toggleButton");
newsBox = document.querySelector(".box");
const body = document.body;

async function fetchWeather(city) {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (response.status == 404) {
                alert("City not found!");
        } else {
                var data = await response.json();
                console.log(data);
                document.querySelector("#tempInfo").innerHTML = Math.round(data.main.temp) + "°C";
                document.querySelector("#cityName").innerHTML = data.name;
                document.querySelector("#countryName").innerHTML = data.sys.country;
                document.querySelector("#humi").innerHTML = data.main.humidity + "%";
                document.querySelector("#wind").innerHTML = data.wind.speed + "km/h";
                document.querySelector("#pressure").innerHTML = data.main.pressure + "hPa";
                document.querySelector("#rise").innerHTML = new Date(data.sys.sunrise * 1000).toLocaleTimeString().slice(0, 5) + "AM";
                document.querySelector("#set").innerHTML = new Date(data.sys.sunset * 1000).toLocaleTimeString().slice(0, 5) + "PM";

                if (data.weather[0].main == "Clouds") {
                        weatherIcon.src = "cloudyEmoji.png";
                        mainImg.style.backgroundImage = "url('cloudyDay.jpg')";
                } else if (data.weather[0].main == "froze") {
                        weatherIcon.src = "freezingEmoji.png";
                        mainImg.style.backgroundImage = "url('freezingDay.jpg')";
                } else if (data.weather[0].main == "Rain") {
                        weatherIcon.src = "rainy-day.png";
                        mainImg.style.backgroundImage = "url('rainyDay.jpg')";
                } else if (data.weather[0].main == "storm") {
                        weatherIcon.src = "stormEmoji.png";
                        mainImg.style.backgroundImage = "url('rainyDay.jpg')";
                } else if (data.weather[0].main == "Snow") {
                        weatherIcon.src = "snowyEmoji.png";
                        mainImg.style.backgroundImage = "url('snowDay.jpg')";
                } else if (data.weather[0].main == "fog") {
                        weatherIcon.src = "foggyEmoji.png";
                        mainImg.style.backgroundImage = "url('foggyDay.jpg')";
                } else {
                        weatherIcon.src = "sun.png";
                        mainImg.style.backgroundImage = "url('sunnyDay.jpg')";
                }
        }


}

searchBtn.addEventListener("click", () => {
        fetchWeather(inputBox.value);
});

modeToggle.addEventListener("click", () => {
        body.classList.toggle("dark");
        if (body.classList.contains("dark")) {
                body.style.backgroundImage = "url('https://images.unsplash.com/photo-1598812866501-87ad598839e7?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8')";
                body.style.transition = "0.5s";
                newsSec.style.color = "white";
                newsBox.style.border = "1px solid white";
        } else {
                // reset styles when leaving dark mode
                body.style.backgroundImage = "url('https://i.pinimg.com/236x/bf/2d/ca/bf2dca7ebf1ed468d3d7de578c41897e.jpg')";
                body.style.color = "black";
                newsSec.style.color = "black";
        }
});

let currentQuery = "everything";
let currentPage = 1;
const fetchNews = async (page, q) => {
        var url = 'https://newsapi.org/v2/everything?' +
                'q=' +q+
                '&from=2026-01-17&' +
                'pageSize=16&' +
                'language=en&' +
                'page=' + page +
                '&sortBy=popularity&' +
                'apiKey=572af036dc1944db923c747659088a26';

        var req = new Request(url);

        let a = await fetch(req)
        let response = await a.json();
        console.log(response);

        resulCount.innerHTML = response.totalResults;

        let str = "";

        for (let item of response.articles) {
                str = str + `
                <div class="boxH">
          <img id="newsImg" src="${item.urlToImage}" alt="">
          <h2 id="title">${item.title.slice(0,50)}...</h2>
          <h3 id="author">${item.author}</h3>
          <p id="desc">${item.description}...</p>
          <button id="moreInfo"><a href="${item.url}">Read More</a></button>
        </div>`
        }
        document.querySelector(".box").innerHTML = str;

}
fetchNews(1, currentQuery);
newsBtn.addEventListener("click", (e) => {
        e.preventDefault();
        let query = newsInput.value;
        currentQuery = query;
        fetchNews(1, query);
});
prevPage.addEventListener("click", (e) => {
        e.preventDefault();
        if (currentPage > 1) {
                currentPage = currentPage - 1;
                fetchNews(currentPage, currentQuery);
        }
});
nextPage.addEventListener("click", (e) => {
        e.preventDefault();
        currentPage = currentPage + 1;
        fetchNews(currentPage, currentQuery);
});     