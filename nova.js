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
const newsButton = document.getElementById("news");
const currencyButton = document.getElementById("currency");
const translateButton = document.getElementById("translate");
const stocksButton = document.getElementById("stocks");

// Information
var title;
var description;
var article;
var pageURL;
var imageURL;

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
    "prime minister",
    "celebrity"
];

const currencyKeywords = [
    "currency"
]

const languageCodes = {
    "Afrikaans": "af",
    "Albanian language": "sq",
    "Amharic": "am",
    "Arabic": "ar",
    "Armenian language": "hy",
    "Assamese language": "as",
    "Aymara language": "ay",
    "Azerbaijani language": "az",
    "Bambara language": "bm",
    "Basque language": "eu",
    "Belarusian language": "be",
    "Bengali language": "bn",
    "Bhojpuri language": "bho",
    "Bosnian language": "bs",
    "Bulgarian language": "bg",
    "Catalan language": "ca",
    "Cebuano language": "ceb",
    "Chewa language": "ny",
    "Simplified Chinese characters": "zh-CN",
    "Traditional Chinese characters": "zh-TW",
    "Corsican language": "co",
    "Croatian language": "hr",
    "Czech language": "cs",
    "Danish language": "da",
    "Maldivian language": "dv",
    "Dogri language": "doi",
    "Dutch language": "nl",
    "English language": "en",
    "Esperanto": "eo",
    "Estonian language": "et",
    "Ewe language": "ee",
    "Filipino language": "tl",
    "Finnish language": "fi",
    "French language": "fr",
    "Frisian languages": "fy",
    "Galician language": "gl",
    "Georgian language": "ka",
    "German language": "de",
    "Greek language": "el",
    "Guarani language": "gn",
    "Gujarati language": "gu",
    "Haitian Creole": "ht",
    "Hausa language": "ha",
    "Hawaiian language": "haw",
    "Hebrew language": "iw",
    "Hindi": "hi",
    "Hmong language": "hmn",
    "Hungarian language": "hu",
    "Icelandic language": "is",
    "Igbo language": "ig",
    "Ilocano language": "ilo",
    "Indonesian language": "id",
    "Irish language": "ga",
    "Italian language": "it",
    "Japanese language": "ja",
    "Javanese language": "jw",
    "Kannada": "kn",
    "Kazakh language": "kk",
    "Khmer language": "km",
    "Kinyarwanda": "rw",
    "Konkani language": "gom",
    "Korean language": "ko",
    "Krio language": "kri",
    "Kurmanji": "ku",
    "Sorani": "ckb",
    "Kyrgyz language": "ky",
    "Lao language": "lo",
    "Latin": "la",
    "Latvian language": "lv",
    "Lingala": "ln",
    "Lithuanian language": "lt",
    "Luganda": "lg",
    "Luxembourgish": "lb",
    "Macedonian language": "mk",
    "Maithili language": "mai",
    "Malagasy language": "mg",
    "Malay language": "ms",
    "Malayalam": "ml",
    "Maltese language": "mt",
    "Māori language": "mi",
    "Marathi language": "mr",
    "Meitei language": "mni",
    "Mizo language": "lus",
    "Mongolian language": "mn",
    "Burmese language": "my",
    "Nepali language": "ne",
    "Norwegian language": "no",
    "Odia language": "or",
    "Oromo language": "om",
    "Pashto": "ps",
    "Persian language": "fa",
    "Polish language": "pl",
    "Portuguese language": "pt",
    "Pubjabi language": "pa",
    "Quechuan languages": "qu",
    "Romanian language": "ro",
    "Russian language": "ru",
    "Samoan language": "sm",
    "Sanskrit": "sa",
    "Scottish Gaelic": "gd",
    "Northern Sotho language": "nso",
    "Serbian language": "sr",
    "Sotho language": "st",
    "Shona language": "sn",
    "Sindhi language": "sd",
    "Sinhala language": "si",
    "Slovak language": "sk",
    "Slovenian language": "sl",
    "Somali language": "so",
    "Spanish language": "es",
    "Sundanese language": "su",
    "Swahili language": "sw",
    "Swedish language": "sv",
    "Tajik language": "tg",
    "Tamil language": "ta",
    "Tatar language": "tt",
    "Telugu language": "te",
    "Thai language": "th",
    "Tigrinya language": "ti",
    "Tsonga language": "ts",
    "Turkish language": "tr",
    "Turkmen language": "tk",
    "Twi": "ak",
    "Ukrainian language": "uk",
    "Urdu": "ur",
    "Uyghur language": "ug",
    "Uzbek language": "uz",
    "Vietnamese language": "vi",
    "Welsh language": "cy",
    "Xhosa language": "xh",
    "Yiddish": "yi",
    "Yoruba language": "yo",
    "Zulu language": "zu"
}

function search() {
    imageURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png";

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

            // Check for currency
            keywordFound = false;

            for (const word of wordsInDescription) {
                if (currencyKeywords.includes(word)) {
                    keywordFound = true;
                    break;
                }
            }

            if (keywordFound) {
                currencyButton.style.display = "flex";
            }

            else {
                currencyButton.style.display = "none";
            }

            // Check for language
            keywordFound = false;

            for (const word of wordsInDescription) {
                if (word.includes("language") && !description.toLowerCase().includes("programming") && !description.toLowerCase().includes("style sheet")) {
                    keywordFound = true;
                    break;
                }
            }

            if (keywordFound) {
                translateButton.style.display = "flex";
            }

            else {
                translateButton.style.display = "none";
            }

            // Check for company
            keywordFound = false;

            for (const word of wordsInDescription) {
                if (word.includes("company") || word.includes("corporation")) {
                    keywordFound = true;
                    break;
                }
            }

            if (keywordFound) {
                stocksButton.style.display = "flex";
            }

            else {
                stocksButton.style.display = "none";
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
        open(`https://www.google.com/search?tbm=isch&q=${title}`, "_blank");
    }

    else if (content == "google-maps") {
        open(`https://www.google.com/maps?q=${title}`, "_blank");
    }

    else if (content == "google-travel") {
        open(`https://www.google.com/flights?q=${title}`, "_blank");
    }

    else if (content == "google-news") {
        open(`https://www.google.com/news?q=${title}`, "_blank");
    }

    else if (content == "google-finance") {
        open(`https://www.google.com/finance?q=${title}`, "_blank");
    }

    else if (content == "google-translate") {
        open(`https://translate.google.com/?sl=auto&tl=${languageCodes[title]}&op=translate`, "_blank");
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