// URLs das músicas no GitHub
const songs = [
    { title: "Música 1", url: "http://mayconbrown.com.br/music/NATANZINHO LIMA 2024 DEZEMBRO, MEU FECHAMENTO É VOCÊ/brownmusic (1).mp3" },
    { title: "Música 2", url: "http://mayconbrown.com.br/music/NATANZINHO LIMA 2024 DEZEMBRO, MEU FECHAMENTO É VOCÊ/brownmusic (2).mp3" },
    { title: "Música 3", url: "http://mayconbrown.com.br/music/NATANZINHO LIMA 2024 DEZEMBRO, MEU FECHAMENTO É VOCÊ/brownmusic (3).mp3" },
    { title: "Música 4", url: "http://mayconbrown.com.br/music/NATANZINHO LIMA 2024 DEZEMBRO, MEU FECHAMENTO É VOCÊ/brownmusic (4).mp3" },
    { title: "Música 5", url: "http://mayconbrown.com.br/music/NATANZINHO LIMA 2024 DEZEMBRO, MEU FECHAMENTO É VOCÊ/brownmusic (5).mp3" },
    { title: "Música 6", url: "http://mayconbrown.com.br/music/NATANZINHO LIMA 2024 DEZEMBRO, MEU FECHAMENTO É VOCÊ/brownmusic (6).mp3" },
    { title: "Música 7", url: "http://mayconbrown.com.br/music/NATANZINHO LIMA 2024 DEZEMBRO, MEU FECHAMENTO É VOCÊ/brownmusic (7).mp3" },
    { title: "Música 8", url: "http://mayconbrown.com.br/music/NATANZINHO LIMA 2024 DEZEMBRO, MEU FECHAMENTO É VOCÊ/brownmusic (8).mp3" },
    { title: "Música 9", url: "http://mayconbrown.com.br/music/NATANZINHO LIMA 2024 DEZEMBRO, MEU FECHAMENTO É VOCÊ/brownmusic (9).mp3" },
    { title: "Música 10", url: "http://mayconbrown.com.br/music/NATANZINHO LIMA 2024 DEZEMBRO, MEU FECHAMENTO É VOCÊ/brownmusic (10).mp3" },
    { title: "Música 11", url: "http://mayconbrown.com.br/music/NATANZINHO LIMA 2024 DEZEMBRO, MEU FECHAMENTO É VOCÊ/brownmusic (11).mp3" },
    { title: "Música 12", url: "http://mayconbrown.com.br/music/NATANZINHO LIMA 2024 DEZEMBRO, MEU FECHAMENTO É VOCÊ/brownmusic (12).mp3" },
    { title: "Música 13", url: "http://mayconbrown.com.br/music/NATANZINHO LIMA 2024 DEZEMBRO, MEU FECHAMENTO É VOCÊ/brownmusic (13).mp3" },
    { title: "Música 14", url: "http://mayconbrown.com.br/music/NATANZINHO LIMA 2024 DEZEMBRO, MEU FECHAMENTO É VOCÊ/brownmusic (14).mp3" },

];

// Variáveis para controle
let currentSongIndex = 0;

// Selecionar elementos
const playlist = document.getElementById("playlist");
const audioPlayer = document.getElementById("audio-player");
const prevButton = document.getElementById("prev-button");
const playButton = document.getElementById("play-button");
const nextButton = document.getElementById("next-button");
const progressBar = document.getElementById("progress-bar");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

// Adicionar músicas na playlist
songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = song.title;
    li.dataset.index = index;
    li.addEventListener("click", () => playSong(index));
    playlist.appendChild(li);
});

// Tocar música selecionada
function playSong(index) {
    currentSongIndex = index;
    audioPlayer.src = songs[currentSongIndex].url;
    audioPlayer.play();
    highlightCurrentSong();
}

// Atualizar botão play/pause
function updatePlayButton() {
    if (audioPlayer.paused) {
        playButton.textContent = "⏯";
    } else {
        playButton.textContent = "⏸";
    }
}

// Tocar/próxima/anterior músicas
playButton.addEventListener("click", () => {
    // Verificar se há uma música carregada no player
    if (!audioPlayer.src) {
        playSong(0); // Carregar e tocar a primeira música
    } else if (audioPlayer.paused) {
        audioPlayer.play(); // Tocar se estiver pausado
    } else {
        audioPlayer.pause(); // Pausar se já estiver tocando
    }
    updatePlayButton(); // Atualizar ícone do botão
});



// Atualizar barra de progresso
audioPlayer.addEventListener("timeupdate", () => {
    progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100 || 0;
    currentTime.textContent = formatTime(audioPlayer.currentTime);
    duration.textContent = formatTime(audioPlayer.duration);
});

// Avançar pela barra de progresso
progressBar.addEventListener("input", () => {
    audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
});

// Formatar tempo em minutos e segundos
function formatTime(time) {
    const minutes = Math.floor(time / 60) || 0;
    const seconds = Math.floor(time % 60) || 0;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Avançar para a próxima música
function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length; // Volta ao início se for a última música
    playSong(currentSongIndex);
}

// Voltar para a música anterior
function playPrevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length; // Vai para a última música se for a primeira
    playSong(currentSongIndex);
}

// Destacar música atual na playlist
function highlightCurrentSong() {
    const allSongs = playlist.querySelectorAll("li");
    allSongs.forEach((li) => li.classList.remove("playing"));
    allSongs[currentSongIndex].classList.add("playing");
}

// Adicionar evento para tocar a próxima música automaticamente
audioPlayer.addEventListener("ended", playNextSong);

// Eventos dos botões
nextButton.addEventListener("click", playNextSong);
prevButton.addEventListener("click", playPrevSong);

// Permitir reprodução em segundo plano (para PWA ou Web App no Android)
document.addEventListener("visibilitychange", () => {
    if (document.hidden && !audioPlayer.paused) {
        audioPlayer.play();
    }
});
