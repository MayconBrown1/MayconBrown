let isFullScreen = false;
let isDragging = false;
let previousMouseX = 0;
let sphere;
let camera;
let renderer;
let scene;

function initViewer(containerId, imagePath) {
    const container = document.getElementById(containerId);

    // Criando a cena do Three.js
    scene = new THREE.Scene();

    // Definindo a câmera
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 0);

    // Criando o renderizador
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Carregando a imagem 360º como textura
    const texture = new THREE.TextureLoader().load(imagePath);
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1); // Inverter a geometria para visualizar de dentro

    // Criando o material e aplicando na esfera
    const material = new THREE.MeshBasicMaterial({ map: texture });
    sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Função de animação para renderizar a cena
    function animate() {
        requestAnimationFrame(animate);

        // Se a imagem estiver em tela cheia, a rotação será controlada pelo mouse
        if (isDragging) {
            const deltaX = previousMouseX - event.clientX;
            sphere.rotation.y += deltaX * 0.005;  // Ajusta a velocidade da rotação
            previousMouseX = event.clientX;
        }

        renderer.render(scene, camera);
    }

    animate();

    // Adicionando o evento de mouse para arrastar a imagem
    container.addEventListener('mousedown', function(event) {
        isDragging = true;
        previousMouseX = event.clientX;
    });

    container.addEventListener('mousemove', function(event) {
        if (isDragging) {
            const deltaX = previousMouseX - event.clientX;
            sphere.rotation.y += deltaX * 0.005;
            previousMouseX = event.clientX;
        }
    });

    container.addEventListener('mouseup', function() {
        isDragging = false;
    });

    container.addEventListener('mouseleave', function() {
        isDragging = false;
    });
}

// Inicializando os visualizadores com as imagens 360º
initViewer('viewer1', 'imagens/imagem1.jpg');
initViewer('viewer2', 'imagens/imagem2.jpg');
initViewer('viewer3', 'imagens/imagem3.jpg');
initViewer('viewer4', 'imagens/imagem4.jpg');

// Função para entrar no modo tela cheia
function enterFullScreen(containerId) {
    const container = document.getElementById(containerId);

    if (isFullScreen) {
        // Sair do modo tela cheia
        document.exitFullscreen ? document.exitFullscreen() :
        document.mozCancelFullScreen ? document.mozCancelFullScreen() :
        document.webkitExitFullscreen ? document.webkitExitFullscreen() :
        document.msExitFullscreen && document.msExitFullscreen();

        // Ajustar o estilo para o modo normal
        const viewer = container.querySelector('.viewer');
        viewer.style.width = '48%';
        viewer.style.height = '300px';

        isFullScreen = false;
    } else {
        // Entrar no modo tela cheia
        if (container.requestFullscreen) {
            container.requestFullscreen();
        } else if (container.mozRequestFullScreen) { // Firefox
            container.mozRequestFullScreen();
        } else if (container.webkitRequestFullscreen) { // Chrome, Safari e Opera
            container.webkitRequestFullscreen();
        } else if (container.msRequestFullscreen) { // IE/Edge
            container.msRequestFullscreen();
        }

        // Ajustar o estilo para o modo tela cheia
        const viewer = container.querySelector('.viewer');
        viewer.style.width = '100vw';
        viewer.style.height = '100vh';

        isFullScreen = true;
    }
}

// Função para permitir o controle do giroscópio (dispositivos móveis)
if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', function(event) {
        if (isFullScreen) {
            const gamma = event.gamma; // Controle da rotação em torno do eixo Y
            sphere.rotation.y = gamma * Math.PI / 180;  // Ajusta a rotação com base no giroscópio
        }
    });
}
