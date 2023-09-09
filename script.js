const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
// VoiceRSS Javascript SDK

const APIKey = 'c4ff6e24ab474fadb3b32af358362a59';

//Disable button 
function toggleButton() {
  button.disabled = !button.disabled;
}

// passing the joke to VOICERSS 
function tellJoke(joke) {
     VoiceRSS.speech({
            key: APIKey,
            src: joke,
            hl: 'en-us',
            v: 'Linda',
            r: 0, 
            c: 'mp3',
            f: '44khz_16bit_stereo',
            ssml: false
        });
}

// Get jokes from Joke API 
async function getJokes() {
  let joke = '';
  const apiUrl = 'https://v2.jokeapi.dev/joke/Programming,Christmas?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if(data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
  } catch (error) {
    console.log('Upss', error);
  }
  tellJoke(joke);
  toggleButton();
}

// event listener
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);