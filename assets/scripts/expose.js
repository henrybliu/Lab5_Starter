// expose.js

window.addEventListener('DOMContentLoaded', init);
const jsConfetti = new JSConfetti({ window });

function init() {
  //update image and horn from dropdown
  const selectElement = document.getElementById('horn-select');
  const pickImage = document.querySelectorAll('img')[0];
  const pickAudio = document.querySelector('audio');

  selectElement.addEventListener('change', (e) => {
    pickImage.src = `assets/images/${e.target.value}.svg`;
    pickAudio.src = `assets/audio/${e.target.value}.mp3`;
    console.log(pickAudio);
  });

  //adjust volume icon accordingly
  const pickVolume = document.getElementById('volume');
  const pickSpeaker = document.querySelector('#volume-controls img');
  pickVolume.addEventListener('change', (e) => {
    if (pickVolume.value == 0) {
      pickSpeaker.src = 'assets/icons/volume-level-0.svg';
    } else if (1 <= pickVolume.value && pickVolume.value < 33) {
      pickSpeaker.src = 'assets/icons/volume-level-1.svg';
    } else if (33 <= pickVolume.value && pickVolume.value < 67) {
      pickSpeaker.src = 'assets/icons/volume-level-2.svg';
    } else {
      pickSpeaker.src = 'assets/icons/volume-level-3.svg';
    }
  });

  //play the music when clicking on play
  const hitPlay = document.querySelector('button');
  hitPlay.addEventListener('click', (e) => {
    pickAudio.volume = parseFloat(pickVolume.value / 100);
    pickAudio.play();

    if (selectElement.value == 'party-horn') {
      jsConfetti.addConfetti();
    }
  });
}
