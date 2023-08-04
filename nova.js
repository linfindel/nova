// Document
const landingSection = document.getElementById("landing");
const contentSection = document.getElementById("content");
const titleSection = document.getElementById("title");
const descriptionSection = document.getElementById("description");
const articleSection = document.getElementById("article");
const imageSection = document.getElementById("image");
const searchBox = document.getElementById("search");
const copyArticleButton = document.getElementById("copy-article");
const openImageButton = document.getElementById("open-image");
const travelButton = document.getElementById("travel");
const mapsButton = document.getElementById("maps");
const newsButton = document.getElementById("news")

// Information
var title;
var description;
var article;
var pageURL;
var imageURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png";

// Analysis
const placeKeywords = [
    "village",
    "city",
    "town",
    "human settlement",
    "attraction",
    "theme park",
    "country",
    "continent",
    "state",
    "county",
    "monument",
    "national park",
    "mountain",
    "river",
    "lake",
    "beach",
    "forest",
    "island",
    "cave",
    "canyon"
];

const newsKeywords = [
    "ongoing",
    "since",
    "current",
    "politician",
    "president",
    "prime minister"
];

function search() {
    var searchTerm = searchBox.value;
    searchTerm = searchTerm.replace(/(\?|\ba\b|\ban\b|\bwhat is\b|\bwhat are\b|\bwho is\b|\bwho was\b|\bwhere is\b|\bwhere was\b|\bthe\b)/gi, "").trim()

    if (searchTerm != "") {
        fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchTerm)}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            title = data.title;
            description = data.description;
            article = data.extract;
            pageURL = data.content_urls.desktop.page;

            if (data.originalimage && data.originalimage.source) {
                imageURL = data.originalimage.source;
            }

            titleSection.innerText = title;
            descriptionSection.innerText = description;
            articleSection.innerText = article;

            if (imageURL) {
                imageSection.style.backgroundImage = `url('${imageURL}')`;
                imageSection.style.display = "flex";
                openImageButton.style.display = "flex";
            }

            else {
                imageSection.style.display = "none";
                openImageButton.style.display = "none";
            }

            // Check for place
            var wordsInDescription = description.toLowerCase().split(/\s+/);
            let keywordFound = false;

            for (const word of wordsInDescription) {
                if (placeKeywords.includes(word)) {
                    keywordFound = true;
                    break;
                }
            }

            if (keywordFound) {
                mapsButton.style.display = "flex";
                travelButton.style.display = "flex";
            }

            else {
                mapsButton.style.display = "none";
                travelButton.style.display = "none";
            }

            // Check for news
            keywordFound = false;

            for (const word of wordsInDescription) {
                if (newsKeywords.includes(word)) {
                    keywordFound = true;
                    break;
                }
            }

            if (containsYearMoreThanTenYearsAgo(description)) {
                keywordFound = false;
            }

            if (keywordFound) {
                newsButton.style.display = "flex";
            }

            else {
                newsButton.style.display = "none";
            }

            landingSection.style.transform = "translateY(100vh)";
            contentSection.style.transform = "translateY(-40vh)";
        })
        .catch(error => {
            document.getElementById("search-container").className = "search-box-error";

            setTimeout(() => {
                document.getElementById("search-container").className = "search-box";
            }, 1000);
        });
    }

    else {
        landingSection.style.transform = "translateY(20vh)";
        contentSection.style.transform = "translateY(100vh)";
    }
}

function copy() {
    navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
        if (result.state === "granted" || result.state === "prompt") {
            navigator.clipboard.writeText(articleSection.innerText);
            copyArticleButton.classList.add("button-icon-success");
    
            setTimeout(() => {
                copyArticleButton.classList.remove("button-icon-success");
            }, 1000);
        }

        else {
            copyArticleButton.classList.add("button-icon-error");

            setTimeout(() => {
                copyArticleButton.classList.remove("button-icon-error");
            }, 1000);
        }
    });
}

function openInNew(content) {
    if (content == "article") {
        open(pageURL, "_blank");
    }

    else if (content == "image") {
        open(imageURL, "_blank");
    }

    else if (content == "google") {
        open(`https://www.google.com/search?q=${title}`, "_blank");
    }

    else if (content == "google-images") {
        open(`https://www.google.com/search?tbm=isch&q=${title}`, "_blank")
    }

    else if (content == "google-maps") {
        open(`https://www.google.com/maps?q=${title}`, "_blank")
    }

    else if (content == "google-travel") {
        open(`https://www.google.com/flights?q=${title}`, "_blank")
    }

    else if (content == "google-news") {
        open(`https://www.google.com/news?q=${title}`, "_blank")
    }
}

function containsYearMoreThanTenYearsAgo(description) {
    const currentYear = new Date().getFullYear();
    const yearRegex = /\b\d{4}\b/g;
    const years = description.match(yearRegex);

    if (!years) {
        return false; // No years found in the description
    }

    for (let i = 0; i < years.length; i++) {
        const yearStr = years[i];
        const year = parseInt(yearStr, 10);
        if (!isNaN(year) && (currentYear - year) > 10) {
            // Check if the word "born" precedes the year
            const index = description.indexOf(yearStr);
            if (index >= 5 && description.slice(index - 5, index).toLowerCase() === "born ") {
                return false; // The year is more than 10 years ago and is preceded by "born"
            }
        }
    }

    return true; // All years found are either recent or not preceded by "born"
}