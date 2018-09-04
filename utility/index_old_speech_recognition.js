
window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
const synth = window.speechSynthesis;
const recognition = new SpeechRecognition();

const icon = document.querySelector('i.fa.fa-microphone')
//let paragraph = document.createElement('p');
//let container = document.querySelector('.text-box');
//container.appendChild(paragraph);
//const sound = document.querySelector('.sound');

$(function($){

  body = {
    intro : true
  }

  $.post("/intro", body ,function(intro){
    console.log(intro);
    speak1(intro, function(bool){
    
      if(bool){
        $("#chat").append($('<li>').text('Gizmo:: '+ intro));
      }
    });
    
  });

});

function speak1(intro, callback){
  
  utterThis = new SpeechSynthesisUtterance(intro);
  synth.speak(utterThis);
  callback(true);

}

var i=0;
function myLoop () {           //  create a loop function
   setTimeout(function () {    //  call a 3s setTimeout when the loop is called
      dictate()          //  your code here
      i++;                     //  increment the counter
      if (i < 10) {
        //console.log("h ")          //  if the counter < 10, call the loop function
        myLoop();             //  ..  again which will trigger another 
      }                        //  ..  setTimeout()
   }, 7000)
}

myLoop();


/*

var promise = new Promise(function(resolve, reject){
  setTimeout(resolve, 500, dictate1() );
});


  Promise.all([promise]).then(function(values) {
    console.log("-----------> Value:: ---> ", values);
  });
*/


function dictate1(){
  recognition.start();
  recognition.onresult = (event) => {
    const speechToText = event.results[0][0].transcript;
    console.log(speechToText);
    
    $("#chat").append($('<li>').text(speechToText));
    
    if (event.results[0].isFinal) {

      if (speechToText.includes(' time')) {
          $("#chat").append($('<li>').text(getTime));
          speak(getTime);
      };
      
      if (speechToText.includes('what is today\'s date')) {
          $("#chat").append($('<li>').text(getDate));
          speak(getDate);
      };
      
      if (speechToText.includes('what is the weather in')) {
        //$("#chat").append($('<li>').text(getTheWeather(speechToText)));
        getTheWeather(speechToText);

      };
    }
  }
}



/*
function test(){
    dictate();
    test1();
}

function test1(){
  console.log("test()")
  test();
}
*/

/*

function continue_dictate(nothing, callback){
  dictate();
}

*/


icon.addEventListener('click', () => {
//  sound.play();
  dictate();
});

const dictate = () => {
  recognition.start();
  recognition.onresult = (event) => {
    const speechToText = event.results[0][0].transcript;
    console.log(speechToText);
    
    $("#chat").append($('<li>').text(speechToText));
    
    if (event.results[0].isFinal) {

      if (speechToText.includes(' time')) {
          $("#chat").append($('<li>').text(getTime));
          speak(getTime);
      };
      
      if (speechToText.includes('what is today\'s date')) {
          $("#chat").append($('<li>').text(getDate));
          speak(getDate);
      };
      
      if (speechToText.includes('what is the weather in')) {
        //$("#chat").append($('<li>').text(getTheWeather(speechToText)));
        getTheWeather(speechToText);

      };
    }
  }
}

const speak = (action) => {
  utterThis = new SpeechSynthesisUtterance(action());
  synth.speak(utterThis);
};

const getTime = () => {
  const time = new Date(Date.now());
  return `the time is ${time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`
};

const getDate = () => {
  const time = new Date(Date.now())
  return `today is ${time.toLocaleDateString()}`;
};

const getTheWeather = (speech) => {
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${speech.split(' ')[5]}&appid=58b6f7c78582bffab3936dac99c31b25&units=metric`) 
  .then(function(response){
    return response.json();
  })
  .then(function(weather){
    if (weather.cod === '404') {
      utterThis = new SpeechSynthesisUtterance(`I cannot find the weather for ${speech.split(' ')[5]}`);
      synth.speak(utterThis);
      return "I cannot find the weather for ${speech.split(' ')[5]}"
    }
    utterThis = new SpeechSynthesisUtterance(`the weather condition in ${weather.name} is mostly full of ${weather.weather[0].description} at a temperature of ${weather.main.temp} degrees Celcius`);
    synth.speak(utterThis);
  });
};



