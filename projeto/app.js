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

    // Verificando se a imagem existe
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
        imagePath, // Caminho da imagem
        function (texture) {
            const geometry = new THREE.SphereGeometry(500, 60, 40);
            geometry.scale(-1, 1, 1); // Inverter a geometria para visualizar de dentro
            const material = new THREE.MeshBasicMaterial({ map: texture });
            sphere = new THREE.Mesh(geometry, material);
            scene.add(sphere);

            // Iniciar animação
            animate();
        },
        undefined, // Função de progresso (não usada aqui)
        function (err) {
            console.error("Erro ao carregar a textura:", err);
        }
    );
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
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
        document.exitFullscreen ? document.exitFullscreen() :
        document.mozCancelFullScreen ? document.mozCancelFullScreen() :
        document.webkitExitFullscreen ? document.webkitExitFullscreen() :
        document.msExitFullscreen && document.msExitFullscreen();

        const viewer = container.querySelector('.viewer');
        viewer.style.width = '48%';
        viewer.style.height = '300px';

        isFullScreen = false;
    } else {
        if (container.requestFullscreen) {
            container.requestFullscreen();
        } else if (container.mozRequestFullScreen) {
            container.mozRequestFullScreen();
        } else if (container.webkitRequestFullscreen) {
            container.webkitRequestFullscreen();
        } else if (container.msRequestFullscreen) {
            container.msRequestFullscreen();
        }

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
            const gamma = event.gamma;
            sphere.rotation.y = gamma * Math.PI / 180;
        }
    });
}
