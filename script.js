// Função para alternar o menu
function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('active');
}

// Função para ajustar o botão de instalação
let deferredPrompt;
const installButton = document.getElementById('install-button');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Exibe o botão de instalação como um pop-up
    installButton.style.display = 'block';
    installButton.classList.add('install-popup');  // Adiciona uma classe para garantir o estilo
});

installButton.addEventListener('click', () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            deferredPrompt = null;
            installButton.style.display = 'none';
        });
    }
});
/ Botão para instalar PWA
  let deferredPrompt;
  
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = "inline-block";
  });
  
  installBtn.addEventListener("click", async () => {
    installBtn.style.display = "none";
  
    if (!deferredPrompt) return;
  
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    deferredPrompt = null;
  });
  
  // Ocultar botão instalar se já instalado
  window.addEventListener("appinstalled", () => {
    installBtn.style.display = "none";
  });
