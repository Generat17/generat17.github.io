document.querySelector('#video_act').onclick = video_act;
document.querySelector('#stop').onclick = stop;
document.querySelector('#step-back').onclick = stepBack;
document.querySelector('#step-forward').onclick = stepForward;
document.querySelector('#volume').oninput = volume;
document.querySelector('#video_speed').onchange = videoChangeSpeed;

// кнопки
let actionButton = document.querySelector('#video_act');
let speedSelect = document.querySelector('#video_speed');

let video = document.querySelector('#video');
let volumeBar = document.querySelector('#volume');
let progress = document.querySelector('#progress');

let progressTime = document.querySelector('#progress-time');

progressTime.innerHTML = `0:0:0 / 0:0:0`;

video.ontimeupdate = progressUpdate;
progress.onclick = videoRewind;
video.onclick = videoPlay;

function video_act() {
    if (video.paused) {

        video.play();

        actionButton.setAttribute('class', 'player__status-bar__left__video_act-play');

    } else {

        video.pause();

        actionButton.setAttribute('class', 'player__status-bar__left__video_act-pause');

    }
}

function stop() {
    video.pause();
    video.currentTime = 0;
}

function stepBack() {
    video.currentTime = video.currentTime - 5;
}

function stepForward() {
    video.currentTime = video.currentTime + 5;
}

function volume() {
    video.volume = this.value / 100;
    console.log(this, progress.value, video.volume)
}

function videoChangeSpeed() { //Меняем скорость

    let speed = speedSelect.value / 100;

    video.playbackRate = speed;

}

function progressUpdate() {
    let d = video.duration;
    let c = video.currentTime;
    let t = `${Math.floor(c / 3600)}:${Math.floor(c / 60)}:${Math.floor(c % 60)}`;
    let maxt = `${Math.floor(d / 3600)}:${Math.floor(d / 60)}:${Math.floor(d % 60)}`;
    progress.value = (100 * c) / d;
    progressTime.innerHTML = `${t} / ${maxt}`;
}

function videoRewind() {
    let w = this.offsetWidth;
    let o = event.offsetX;
    this.value = o / w * 100;
    video.pause();
    video.currentTime = video.duration * o / w;
    video.play();
}

function videoPlay() {
    let c = video.currentTime;
    let p = video.paused;
    let e = video.ended;
    if (c > 0 && p == false && e == false) video.pause();
    else video.play();
}

document.onkeydown = function (e) {
    //space
    if (e.keyCode == 75 || e.keyCode == 32) {
        videoPlay();
    }
    //right
    if (e.keyCode == 76 || e.keyCode == 39) {
        stepForward();
    }
    //left
    if (e.keyCode == 74 || e.keyCode == 37) {
        stepBack();
    }

    //up
    if (e.keyCode == 38) {
        if (video.volume <= 0.95) {
            video.volume = video.volume + 0.05;
            volumeBar.value = video.volume * 100;
        } else {
            video.volume = 1;
            volumeBar.value = video.volume * 100;
        }
    }
    //down
    if (e.keyCode == 40) {
        if (video.volume >= 0.05) {
            video.volume = video.volume - 0.05;
            volumeBar.value = video.volume * 100;
        } else {
            video.volume = 0;
            volumeBar.value = 0;
        }
    }

    //mute
    if (e.keyCode == 77) {
        if (video.volume == 0) {
            video.volume = 1;
            volumeBar.value = 100;
        } else {
            video.volume = 0;
            volumeBar.value = 0;
        }
    }

    // func - fullscreen for different browsers
    function fullScreen(element) {
        if(element.requestFullscreen) {
            element.requestFullscreen();
        } else if(element.webkitrequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if(element.mozRequestFullscreen) {
            element.mozRequestFullScreen();
        }
    }

    // func - cancel fullscreen for different browsers
    function fullScreenCancel() {
        if(document.requestFullscreen) {
            document.requestFullscreen();
        } else if(document.webkitRequestFullscreen ) {
            document.webkitRequestFullscreen();
        } else if(document.mozRequestFullscreen) {
            document.mozRequestFullScreen();
        }
    }

    //fullscreen
    if (e.keyCode == 70) {
        fullScreen(video);

        //fullScreenCancel(); - зАкрыть полный экран
    }
}