// URLs das músicas no GitHub
const songs = [
    { title: "Avôhai", url: "http://mayconbrown.com.br/music/pop/Zé Ramalho - Voz e Violão - 40 Anos de Música/01 - Zé Ramalho - Avôhai.mp3" },
    { title: "Chão de Giz", url: "http://mayconbrown.com.br/music/pop/Zé Ramalho - Voz e Violão - 40 Anos de Música/02 - Zé Ramalho - Chão de Giz.mp3" },
    { title: "Vila do Sossego", url: "http://mayconbrown.com.br/music/pop/Zé Ramalho - Voz e Violão - 40 Anos de Música/03 - Zé Ramalho - Vila do Sossego.mp3" },
    { title: "A Terceira Lâmina", url: "http://mayconbrown.com.br/music/pop/Zé Ramalho - Voz e Violão - 40 Anos de Música/04 - Zé Ramalho - A Terceira Lâmina.mp3" },
    { title: "Eternas Ondas", url: "http://mayconbrown.com.br/music/pop/Zé Ramalho - Voz e Violão - 40 Anos de Música/05 - Zé Ramalho - Eternas Ondas.mp3" },
    { title: "Táxi Lunar", url: "http://mayconbrown.com.br/music/pop/Zé Ramalho - Voz e Violão - 40 Anos de Música/06 - Zé Ramalho - Táxi Lunar.mp3" },
    { title: "Frevo Mulher", url: "http://mayconbrown.com.br/music/pop/Zé Ramalho - Voz e Violão - 40 Anos de Música/07 - Zé Ramalho - Frevo Mulher.mp3" },
    { title: "Admirável Gado Novo", url: "http://mayconbrown.com.br/music/pop/Zé Ramalho - Voz e Violão - 40 Anos de Música/08 - Zé Ramalho - Admirável Gado Novo.mp3" },
    { title: "Canção Agalopada", url: "http://mayconbrown.com.br/music/pop/Zé Ramalho - Voz e Violão - 40 Anos de Música/09 - Zé Ramalho - Canção Agalopada.mp3" },
    { title: "Pepitas de Fogo", url: "http://mayconbrown.com.br/music/pop/Zé Ramalho - Voz e Violão - 40 Anos de Música/10 - Zé Ramalho - Pepitas de Fogo.mp3" },
    { title: "Força Verde", url: "http://mayconbrown.com.br/music/pop/Zé Ramalho - Voz e Violão - 40 Anos de Música/11 - Zé Ramalho - Força Verde.mp3" },
    { title: "Mulher Nova, Bonita e Carinhosa Faz o Homem Gemer Sem Sentir Dor", url: "http://mayconbrown.com.br/music/pop/Zé Ramalho - Voz e Violão - 40 Anos de Música/12 - Zé Ramalho - Mulher Nova, Bonita e Carinhosa Faz o Homem Gemer Sem Sentir Dor.mp3" },
    { title: "Galope Razante", url: "http://mayconbrown.com.br/music/pop/Zé Ramalho - Voz e Violão - 40 Anos de Música/13 - Zé Ramalho - Galope Razante.mp3" },
    { title: "Kryptônia", url: "http://mayconbrown.com.br/music/pop/Zé Ramalho - Voz e Violão - 40 Anos de Música/14 - Zé Ramalho - Kryptônia.mp3" },
    { title: "Garoto de Aluguel", url: "http://mayconbrown.com.br/music/pop/Zé Ramalho - Voz e Violão - 40 Anos de Música/15 - Zé Ramalho - Garoto de Aluguel.mp3" },
    { title: "Banquete de Signos", url: "http://mayconbrown.com.br/music/pop/Zé Ramalho - Voz e Violão - 40 Anos de Música/16 - Zé Ramalho - Banquete de Signos.mp3" },
    { title: "Entre a Serpente e a Estrela", url: "http://mayconbrown.com.br/music/pop/Zé Ramalho - Voz e Violão - 40 Anos de Música/17 - Zé Ramalho - Entre a Serpente e a Estrela.mp3" },
    { title: "Sinônimos", url: "http://mayconbrown.com.br/music/pop/Zé Ramalho - Voz e Violão - 40 Anos de Música/18 - Zé Ramalho - Sinônimos.mp3" },
    { title: "Mistérios da Meia Noite", url: "http://mayconbrown.com.br/music/pop/Zé Ramalho - Voz e Violão - 40 Anos de Música/19 - Zé Ramalho - Mistérios da Meia Noite.mp3" },
    { title: "Jardim das Acácias", url: "http://mayconbrown.com.br/music/pop/Zé Ramalho - Voz e Violão - 40 Anos de Música/20 - Zé Ramalho - Jardim das Acácias.mp3" },
    { title: "Beira-Mar", url: "http://mayconbrown.com.br/music/pop/Zé Ramalho - Voz e Violão - 40 Anos de Música/21 - Zé Ramalho - Beira-Mar.mp3" },
    { title: "Batendo na Porta do Céu", url: "http://mayconbrown.com.br/music/pop/Zé Ramalho - Voz e Violão - 40 Anos de Música/22 - Zé Ramalho - Batendo na Porta do Céu.mp3" },
    
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