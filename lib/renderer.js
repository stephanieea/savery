const $ = require('jquery');
const moment = require('moment');

$('#save-recipe-btn').on('click', () => {
  const title = $('#title-field').val();
  const link = $('#url-field').val();
  const newLink = validateUrl(link);
  saveRecipe(title, newLink);
})


const saveRecipe = (title, link) => {
  $('#recipe-box').append(`<li>
    <h2>${title}</h2>
    <a href="${link}">link</a>
  </li>`)
}

const validateUrl = (link) => {
  const urlRegex = /^(http|https)?:\/\/[w]{2,4}[a-zA-Z0-9-\.]+\.[a-z]{1,10}/
  if(!urlRegex.test(link)){
    link = 'https://' + link
  }
  return link;
}

// Helper function, to format the time
const secondsToTime = (s) => {
  const momentTime = moment.duration(s, 'seconds');
  const sec = momentTime.seconds() < 10 ? ('0' + momentTime.seconds()) : momentTime.seconds();
  const min = momentTime.minutes() < 10 ? ('0' + momentTime.minutes()) : momentTime.minutes();
  const hours = momentTime.hours() < 10 ? ('0' + momentTime.hours()) : momentTime.hours();
  return `${hours}:${min}:${sec}`;
}

// Initialize currentTime
let currentTime = 0;

$('#increase-time').on('click', () => {
  currentTime = currentTime + 10
  timerDiv.innerHTML = secondsToTime(currentTime);
})

$('#start-timer').on('click', () => {
  setInterval(() => {
    // When reaching 0. Stop.
    if(currentTime <= 0) return
    // Remove one second
    currentTime = currentTime - 1;
    // Print out the time
    timerDiv.innerHTML = secondsToTime(currentTime);
  }, 1000); // 1 second
})