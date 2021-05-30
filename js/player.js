let player;
let volumePlayer;
const playerContainer = $(".player");

let eventsInit = () => {
  $(".player__start").on("click", e => {
    e.preventDefault();

    if (playerContainer.hasClass("paused")){
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  });

  $(".player__playback").on("click", e => {
    const bar = $(e.currentTarget);
    const clickedPositionOnBar = e.originalEvent.layerX;
    const newButtonPositionPercent = (clickedPositionOnBar / bar.width()) * 100;
    const newPlayBackPositionSec = 
          (player.getDuration() / 100) * newButtonPositionPercent;


    $(".player__playback-button").css({
      left: `${newButtonPositionPercent}%`
    });

    bar.find(".player__playback-active").css({
      width: `${newButtonPositionPercent}%`
    });

    player.seekTo(newPlayBackPositionSec);
  });
};



  const newPositionVolume = (percents) => {
    $(".player__volume-button").css({
      left: `${percents}%`
    });

    $(".player__volume-active").css({
      width: `${percents}%`
    });

    player.setVolume(percents);
  }


  $(".player__volume").on("click", e => {
    const bar = $(e.currentTarget);
    const clickedPositionOnBar = e.originalEvent.layerX;
    const newButtonPositionPercent = (clickedPositionOnBar / bar.width()) * 100;
    newPositionVolume (newButtonPositionPercent);
    volumePlayer = newButtonPositionPercent;
  });

  $(".player__volume-ico").on("click", e => {
    const bar = $(e.currentTarget);
    const isNoSound = bar.hasClass("player__volume-ico--nosound");

    if (isNoSound) {
      bar.removeClass("player__volume-ico--nosound");
      newPositionVolume(volumePlayer);
    } else {
      bar.addClass("player__volume-ico--nosound");
      newPositionVolume(0);
    }
  });




$(".player__splash").on("click", e => {
  player.playVideo();
});


const formatTime = timeSec => {
  const roundTime = Math.round(timeSec);
  const minutes = addZero(Math.floor(roundTime / 60));
  const seconds = addZero(roundTime - minutes*60);

  function addZero (num) {
    return num < 10 ? `0${num}`:num;
  }
  return `${minutes} : ${seconds}`;
}

const onPlayerReady = () => {
  let interval;
  const durationSec = player.getDuration();
  volumePlayer = player.getVolume();
  newPositionVolume(volumePlayer);

  // $(".player__duration-estimate").text(formatTime(durationSec));

  if (typeof interval == "undefined") {
    clearInterval(interval);
  }

  interval = setInterval(() => {
    const completedSec = player.getCurrentTime();
    const completedPersent = (completedSec / durationSec) * 100;

    $(".player__playback-button").css({
      left: `${completedPersent}%`
    });

    $(".player__playback-active").css({
      width: `${completedPersent}%`
    });

    // $(".player__duration-completed").text(formatTime(completedSec));
  }, 1000);
}

const onPlayerStateChange = (event) => {
  /*
    -1 (воспроизведение видео не начато)
    0 (воспроизведение видео завершено)
    1 (воспроизведение)
    2 (пауза)
    3 (буферизация)
    5 (видео подают реплики).
  */
  switch (event.data) {
    case 1:
      playerContainer.addClass("active");
      playerContainer.addClass("paused");
      break;

    case 2:
      playerContainer.removeClass("active");
      playerContainer.removeClass("paused");
      break;
  }
};

function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    height: '390',
    width: '660',
    videoId: 'BHACKCNDMW8', //BHACKCNDMW8
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    },
    playerVars: {
      controls: 0,
      disablekb: 0,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 0
    }
  });
}




eventsInit();