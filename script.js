const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let getQuoteErrorCount = 0;

function showLoadingSpinner() {
   loader.hidden = false;
   quoteContainer.hidden = true
}

function removeLoadingSpinner() {
   if (loader.hidden != true) {
      loader.hidden = true;
      quoteContainer.hidden = false
   }
}

// Get quote from API

async function getQuote() {
   const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
   const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
   try {

      showLoadingSpinner();
      const response = await fetch(proxyUrl + apiUrl);
      const data = await response.json();
      //  if author is blank, add 'Unknown'
      if (data.quoteAuthor === '') {
         authorText.innerText = 'Unknown';
      } else {
         authorText.innerText = data.quoteAuthor;
      }

      if (data.quoteText.length > 120) {
         quoteText.classList.add('long-quote');
      } else {
         quoteText.classList.remove('long-quote');
      }

      quoteText.innerText = data.quoteText;

      // Stop loader & show quote text
      removeLoadingSpinner();
   } catch (error) {
      if (getQuoteErrorCount < 5) {
         getQuoteErrorCount += 1;
         getQuote();
      }
   }

}

// Tweet Quote
function tweetQuote() {
   const quote = quoteText.innerText;
   const author = authorText.innerText;
   const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
   window.open(twitterUrl, '_blank');

}

// Button Click Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();