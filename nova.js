const navbar = document.getElementById("navbar");
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

const leftButtons = document.getElementById("left-buttons");
const rightButtons = document.getElementById("right-buttons");

const leftDivider = document.getElementById("left-divider");
const rightDivider = document.getElementById("right-divider");

const searchContainer = document.getElementById("search-container");

const buttonToolbar = document.getElementById("toolbar");

const caseSnackbarElement = document.getElementById("case-snackbar");

var title;
var description;
var article;
var pageURL;
var imageURL;

const placeKeywords = [
  "village",
  "city",
  "capital city",
  "capital of",
  "capital",
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

const spaceKeywords = [
  "planet",
  "moon",
  "natural satellite",
  "nebula",
  "supernova",
  "star",
  "asteroid",
  "comet",
  "galaxy",
  "black hole"
];

function search(device) {
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

      document.title = `${title} | Nova`;

      var maxAnswerLength;

      if (device != "mobile") {
        maxAnswerLength = 800;
      }

      else {
        maxAnswerLength = 100;
      }

      article = data.extract.slice(0, maxAnswerLength);

      if (article.length < data.extract.length) {
        article = article.trim();
        article += "... ";
      }

      if (data.originalimage && data.originalimage.source) {
        imageURL = data.originalimage.source;

        generateMaterialDesignPalette(imageURL, (error, palette) => {
          if (error) {
            console.error(error);
          }
            
          else {
            console.log("Material Design Palette:", palette);           
        
            navbar.style.backgroundColor = generateRGBA(palette.accent, 0.25);
            searchContainer.style.backgroundColor = generateRGBA(palette.accent, 0.25);
            copyArticleButton.style.backgroundColor = generateRGBA(palette.accent, 0.25);
            openImageButton.style.backgroundColor = generateRGBA(palette.accent, 0.25);
            document.getElementById("wikipedia").style.backgroundColor = generateRGBA(palette.accent, 0.25);
            travelButton.style.backgroundColor = generateRGBA(palette.accent, 0.25);
            mapsButton.style.backgroundColor = generateRGBA(palette.accent, 0.25);
            newsButton.style.backgroundColor = generateRGBA(palette.accent, 0.25);
            currencyButton.style.backgroundColor = generateRGBA(palette.accent, 0.25);
            translateButton.style.backgroundColor = generateRGBA(palette.accent, 0.25);
            stocksButton.style.backgroundColor = generateRGBA(palette.accent, 0.25);
  
            searchContainer.addEventListener("mouseover", () => {
              searchContainer.style.backgroundColor = generateRGBA(palette.accent, 0.5);
            });
            searchContainer.addEventListener("mouseout", () => {
                if (document.activeElement != searchBox) {
                  searchContainer.style.backgroundColor = generateRGBA(palette.accent, 0.25);
                }
            });
            searchContainer.addEventListener("focusin", () => {
              searchContainer.style.backgroundColor = generateRGBA(palette.accent, 0.5);
            });
            searchContainer.addEventListener("focusout", () => {
              searchContainer.style.backgroundColor = generateRGBA(palette.accent, 0.25);
            });

            copyArticleButton.addEventListener("mouseover", () => {
              copyArticleButton.style.backgroundColor = generateRGBA(palette.accent, 0.5);
            });
            copyArticleButton.addEventListener("mouseout", () => {
              copyArticleButton.style.backgroundColor = generateRGBA(palette.accent, 0.25);
            });

            openImageButton.addEventListener("mouseover", () => {
              openImageButton.style.backgroundColor = generateRGBA(palette.accent, 0.5);
            });
            openImageButton.addEventListener("mouseout", () => {
              openImageButton.style.backgroundColor = generateRGBA(palette.accent, 0.25);
            });

            document.getElementById("wikipedia").addEventListener("mouseover", () => {
              document.getElementById("wikipedia").style.backgroundColor = generateRGBA(palette.accent, 0.5);
            });
            document.getElementById("wikipedia").addEventListener("mouseout", () => {
              document.getElementById("wikipedia").style.backgroundColor = generateRGBA(palette.accent, 0.25);
            });

            travelButton.addEventListener("mouseover", () => {
              travelButton.style.backgroundColor = generateRGBA(palette.accent, 0.5);
            });
            travelButton.addEventListener("mouseout", () => {
              travelButton.style.backgroundColor = generateRGBA(palette.accent, 0.25);
            });

            mapsButton.addEventListener("mouseover", () => {
              mapsButton.style.backgroundColor = generateRGBA(palette.accent, 0.5);
            });
            mapsButton.addEventListener("mouseout", () => {
              mapsButton.style.backgroundColor = generateRGBA(palette.accent, 0.25);
            });

            newsButton.addEventListener("mouseover", () => {
              newsButton.style.backgroundColor = generateRGBA(palette.accent, 0.5);
            });
            newsButton.addEventListener("mouseout", () => {
              newsButton.style.backgroundColor = generateRGBA(palette.accent, 0.25);
            });

            currencyButton.addEventListener("mouseover", () => {
              currencyButton.style.backgroundColor = generateRGBA(palette.accent, 0.5);
            });
            currencyButton.addEventListener("mouseout", () => {
              currencyButton.style.backgroundColor = generateRGBA(palette.accent, 0.25);
            });

            translateButton.addEventListener("mouseover", () => {
              translateButton.style.backgroundColor = generateRGBA(palette.accent, 0.5);
            });
            translateButton.addEventListener("mouseout", () => {
              translateButton.style.backgroundColor = generateRGBA(palette.accent, 0.25);
            });

            stocksButton.addEventListener("mouseover", () => {
              stocksButton.style.backgroundColor = generateRGBA(palette.accent, 0.5);
            });
            stocksButton.addEventListener("mouseout", () => {
              stocksButton.style.backgroundColor = generateRGBA(palette.accent, 0.25);
            });

          document.getElementById("text-card").style.backgroundColor = generateRGBA(palette.accent, 0.25);
            }
          });
        }

        titleSection.innerText = title;
        
        if (description) {
          descriptionSection.innerText = description;
        }

        articleSection.innerHTML = article;

        if (imageURL) {
          imageSection.style.backgroundImage = `url('${imageURL}')`;
          imageSection.style.display = "flex";
          openImageButton.style.display = "flex";
        }

        else {
          imageSection.style.display = "none";
          openImageButton.style.display = "none";
        }

        var descriptionNoHyphens = description.replace("-", " ");

        var wordsInDescription = descriptionNoHyphens.toLowerCase().split(/\s+/);
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

        keywordFound = false;

        for (const word of wordsInDescription) {
          if (word.includes("language") && !description.toLowerCase().includes("programming") && !description.toLowerCase().includes("style sheet") && !description.toLowerCase().includes("markup")) {
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

        keywordFound = false;

        for (const word of wordsInDescription) {
          if (spaceKeywords.includes(word)) {
            keywordFound = true;
            break;
          }
        }

        if (keywordFound) {
          imageSection.style.backgroundSize = "contain";
          imageSection.className = "";

          var spaceStyleSet = true;
        }

        else {
          imageSection.style.backgroundSize = "cover";
          imageSection.className = "card-subtle";
        
        }

        var imageWidth = data.originalimage.width;
        var imageHeight = data.originalimage.height;

        const viewportHeight = window.innerHeight;

        if (device != "mobile") {
          var requiredImageHeight = 0.5 * viewportHeight;
          console.log(`Required image height: ${requiredImageHeight}`);

          const aspectRatio = imageWidth / imageHeight;

          var requiredImageWidth = aspectRatio * requiredImageHeight;
        }

        if (imageWidth < imageHeight && !spaceStyleSet) {
          imageSection.style.backgroundSize = "cover";
          imageSection.className = "";

          if (device != "mobile") {
            imageSection.style.width = `${requiredImageWidth}px`;
          }

          console.log("Image is portrait");
        }

        else {
          if (!spaceStyleSet) {
            imageSection.style.backgroundSize = "cover";
            imageSection.className = "card-subtle";
          }

          imageSection.style.width = "40vw";

          console.log("Image is landscape");
        }

        leftButtons.style.display = "flex";
        rightButtons.style.display = "flex";
        leftDivider.style.display = "flex";
        rightDivider.style.display = "flex";
        
        buttonToolbar.style.border = "1px solid rgb(100, 100, 100)";
        buttonToolbar.style.display = "flex";
    })
    .catch(error => {
      console.error(error);

      searchContainer.className = "search-box-error";

      setTimeout(() => {
        searchContainer.className = "search-box";
      }, 1000);

      if (searchTerm === searchTerm.toLowerCase()) {
        caseSnackbar();
      }
    });
  };
}

function copy() {
  navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
    if (result.state === "granted" || result.state === "prompt") {
      navigator.clipboard.writeText(articleSection.innerText);
      copyArticleButton.classList.add("button-success");
    
      setTimeout(() => {
        copyArticleButton.classList.remove("button-success");
      }, 1000);
    }

    else {
      copyArticleButton.classList.add("button-error");

      setTimeout(() => {
        copyArticleButton.classList.remove("button-error");
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
    return false;
  }

  for (let i = 0; i < years.length; i++) {
    const yearStr = years[i];
    const year = parseInt(yearStr, 10);
    if (!isNaN(year) && (currentYear - year) >= 10) {
      const index = description.indexOf(yearStr);

      if (index >= 5 && /\bborn\b/i.test(description.slice(index - 5, index))) {
        return false;
      }
    }
  }

  return false;
}

function caseSnackbar() {
  if (caseSnackbarElement.style.opacity == "0") {
    caseSnackbarElement.style.opacity = "1";
    caseSnackbarElement.style.pointerEvents = "all";
  }

  else {
    caseSnackbarElement.style.opacity = "0";
    caseSnackbarElement.style.pointerEvents = "none";
  }
}

function generateMaterialDesignPalette(imageURL, callback) {
  const img = new Image();
  img.crossOrigin = "Anonymous";
  
  img.onload = function () {
    const vibrant = new Vibrant(img);
    const swatches = vibrant.swatches();
  
    if (swatches) {
      const palette = {
        accent: swatches.Vibrant.getHex(),
        primaryDark: swatches.DarkVibrant.getHex(),
        primaryLight: swatches.LightVibrant.getHex(),
        primary: swatches.Muted.getHex(),
      };
  
      callback(null, palette);
    }
        
    else {
      callback("Failed to generate swatches", null);
    }
  };
  
  img.src = imageURL;
}

function generateRGBA(hex, alpha) {
  hex = hex.replace(/^#/, '');

  const bigint = parseInt(hex, 16);
  const red = (bigint >> 16) & 255;
  const green = (bigint >> 8) & 255;
  const blue = bigint & 255;

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}