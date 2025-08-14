console.log("Welcome To Spotify Clone")

//Initialize the variables
let songIndex = 0; // currently playing song
let audioElement = new Audio ( "songs/1.mp3" ) //actual music player in JS
let masterPlay = document.getElementById ( 'masterPlay' ); // play/pause button
let myProgressBar = document.getElementById ( 'myProgressBar' ); // input slider that shows and controls playback
let gif = document.getElementById('gif'); // animation shown while song is playing

// array of objects
let songs = [

    {songName: "Warriyo - Mortals( feat. Laura Brehm) [ NCS Release ]", filePath: "songs/1.mp3", coverpath:"covers/1.jpg" },
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverpath:"covers/2.jpg" },
    {songName: "DEAF KEV - Invincible [ NCS Release] - 320k", filePath: "songs/3.mp3", coverpath:"covers/3.jpg" },
    {songName: "Different Heaven & EH!DE - My Heart [NCS Release]-320k", filePath: "songs/4.mp3", coverpath:"covers/4.jpg" },
    {songName: "Janji-Heroes-Tonight-feat-", filePath: "songs/5.mp3", coverpath:"covers/5.jpg" },
    {songName: "Salam-e-Ishq", filePath: "songs/6.mp3", coverpath:"covers/6.jpg" },
    {songName: "Salam-e-Ishq", filePath: "songs/7.mp3", coverpath:"covers/7.jpg" },
    {songName: "Salam-e-Ishq", filePath: "songs/8.mp3", coverpath:"covers/8.jpg" },
    {songName: "Salam-e-Ishq", filePath: "songs/9.mp3", coverpath:"covers/9.jpg" },
]


// audioElement.play();

// Handle play/pause action
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.add('fa-circle-play');
        masterPlay.classList.remove('fa-circle-pause');
        gif.style.opacity = 0;

    }
    
}
)

//Listen to events
audioElement.addEventListener( "timeupdate" , ()=>{
    if (audioElement.duration) {
        const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        myProgressBar.value = progress;
    }
    /*
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    // percentage = (current time/ duration)*100
    console.log(progress);
    myProgressBar.value = progress;
*/
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value *audioElement.duration/100;
})

/*
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songListPlay')).forEach((element)=>{
        const icon = element.querySelector('i');
        masterPlay.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songListPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        const icon = e.currentTarget.querySelector('i');
        let index = parseInt(icon.id);

        // If clicking same song that's playing → toggle pause/play
        if(songIndex === index && !audioElement.paused) {
            audioElement.pause();
            icon.classList.add('fa-circle-play');
            icon.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
            gif.style.opacity = 0;
        } else {
            // Play new song
            makeAllPlays(); // reset all small buttons
            songIndex = index;
            icon.target.classList.remove('fa-circle-play');
            icon.target.classList.add('fa-circle-pause');

            audioElement.src = `songs/${index+1}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();

            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
        }
    })
})
*/


// This function correctly resets all song list icons to 'play'
const makeAllPlays = () => {
    // Use the correct class name: songListPlay
    Array.from(document.getElementsByClassName('songListPlay')).forEach((element) => {
        const icon = element.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-circle-pause');
            icon.classList.add('fa-circle-play');
        }
    });
};

// Attach event listeners using the correct class name: songListPlay
Array.from(document.getElementsByClassName('songListPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        const icon = e.currentTarget.querySelector('i');
        const index = parseInt(icon.id);

        // Check if the clicked song is the one already playing
        if (songIndex === index && !audioElement.paused) {
            // Pause the current song
            audioElement.pause();
            icon.classList.remove('fa-circle-pause');
            icon.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            gif.style.opacity = 0;
        } else {
            audioElement.pause(); 
            // Play a new (or paused) song
            makeAllPlays(); // Reset all icons first
            songIndex = index;
            icon.classList.remove('fa-circle-play');
            icon.classList.add('fa-circle-pause');

            audioElement.src = `songs/${songIndex + 1}.mp3`;
            audioElement.currentTime = 0;
            myProgressBar.value = 0;
            audioElement.play();

            
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
        }
    });
});


