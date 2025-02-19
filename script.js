// Função para alternar o menu
function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('active');
}

// Função para ajustar o volume do vídeo para 50%
window.onload = function() {
    const clientVideo = document.getElementById('clientVideo');
    if (clientVideo) {
        clientVideo.volume = 0.5; // Ajusta o volume para 50%
    }
};
