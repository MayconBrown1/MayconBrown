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

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then((registration) => {
      console.log('ServiceWorker registrado com sucesso: ', registration);
    }).catch((error) => {
      console.log('Falha ao registrar o ServiceWorker: ', error);
    });
  });
}
