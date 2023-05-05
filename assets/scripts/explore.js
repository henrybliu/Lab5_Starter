// explore.js

window.addEventListener('DOMContentLoaded', init);
const synth = window.speechSynthesis;
const inputTxt = document.getElementById('text-to-speak');
const voiceSelect = document.querySelector('select');
const play = document.querySelector('button');
const smile = document.querySelector('img');
let voices;

function init() {
  //load voices in
  if ('onvoiceschanged' in synth) {
    synth.onvoiceschanged = loadVoices;
  } else {
    loadVoices();
  }
  //give functionality to the play button
  play.addEventListener('click', (e) => {
    //update the face of the face
    smile.src = 'assets/images/smiling-open.png';
    const utterThis = new SpeechSynthesisUtterance(inputTxt.value);
    utterThis.voice = voices[voiceSelect.value];
    synth.speak(utterThis);
    inputTxt.blur();

    //revert back the face when utterThis is over
    utterThis.addEventListener('end', (e) => {
      smile.src = 'assets/images/smiling.png';
    });
  });
}

function loadVoices() {
  voices = synth.getVoices();
  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement('option');
    option.textContent = `${voices[i].name} (${voices[i].lang})`;
    option.value = i;
    voiceSelect.appendChild(option);
  }
}
