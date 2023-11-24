const API_KEY = "50fd34fb47581fc42e9c38f812929ce6";
const url = "https://gnews.io/api/v4/search?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&lang=en&country=in&apikey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles) {
    const cardContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardContainer.innerHTML = "";
    articles.forEach((article) => {
        if (!article.image) {
            return;
        }
        const cardClone = newsCardTemplate.content.cloneNode(true);

        fillDataInCard(cardClone, article);
        cardContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.image;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });
    newsSource.innerHTML = `${article.source.name} · ${date}`;
    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    })
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchText.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        searchButton.click();
    }
});

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
})
const curdate = document.getElementById("curdate");
const tmonths = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
const tday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const date = new Date();
const day = date.getDay();
const month = date.getMonth();
const cd = date.getDate();
const yr = date.getFullYear();
curdate.innerHTML = `${tday[day]}, ${tmonths[month]} ${cd}, ${yr}`;


function myFunction(x) {
    const element1 = document.getElementById("sdiv");
   
    if (x.matches) { // If media query matches
        
        element1.classList.add()
    }
    else {
           
    }
}

var x = window.matchMedia("(max-width: 1145px)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state changes