const img = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const currentTimeElement = document.getElementById("current-time");
const durationElement = document.getElementById("duration");
const progress = document.getElementById("progress");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

//Music
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight, disco Queen",
    artist: "Jacinto Design",
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Metric/Jacinto Design",
  },
];

let isPlaying = false;

//Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

//Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

//Play or Pause Event Listener
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

//Update Dom
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  img.src = `img/${song.name}.jpg`;
}

//Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

//On load - Select First Song
loadSong(songs[songIndex]);

//update Progress bar & Time
function updateProgressBar(event) {
  if (isPlaying) {
    const { duration, currentTime } = event.srcElement;

    //Update progress bar width
    const progressPersent = (currentTime / duration) * 100;
    progress.style.width = `${progressPersent}%`;

    //calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    if (durationSeconds) {
      durationElement.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    //calculate display for currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    if (currentSeconds) {
      currentTimeElement.textContent = `${currentMinutes}:${currentSeconds}`;
    }
  }
}

//set setProgressbar
function setProgressBar(event) {
  const width = this.clientWidth;
  const clickX = event.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

//Event Listener
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
