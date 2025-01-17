function initViewer(containerId, imagePath) {
    const container = document.getElementById(containerId);

    // Criando a cena do Three.js
    const scene = new THREE.Scene();

    // Definindo a câmera
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 0);

    // Criando o renderizador
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Carregando a imagem 360º como textura
    const texture = new THREE.TextureLoader().load(imagePath);
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1); // Inverter a geometria para visualizar de dentro

    // Criando o material e aplicando na esfera
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Função de animação para renderizar a cena
    function animate() {
        requestAnimationFrame(animate);

        // Controlando a rotação da esfera para visualização 360º
        sphere.rotation.y += 0.001; // Isso fará a imagem girar

        // Renderizando a cena
        renderer.render(scene, camera);
    }

    animate();
}

// Inicializando os visualizadores com as imagens 360º
initViewer('viewer1', 'imagens/imagem1.jpg');
initViewer('viewer2', 'imagens/imagem2.jpg');
initViewer('viewer3', 'imagens/imagem3.jpg');
initViewer('viewer4', 'imagens/imagem4.jpg');

// Função para entrar no modo tela cheia
function enterFullScreen(containerId) {
    const container = document.getElementById(containerId);

    // Verifica se a tela cheia está disponível e entra em tela cheia
    if (container.requestFullscreen) {
        container.requestFullscreen();
    } else if (container.mozRequestFullScreen) { // Firefox
        container.mozRequestFullScreen();
    } else if (container.webkitRequestFullscreen) { // Chrome, Safari e Opera
        container.webkitRequestFullscreen();
    } else if (container.msRequestFullscreen) { // IE/Edge
        container.msRequestFullscreen();
    }

    // Redimensiona o visualizador para a tela cheia
    const viewer = container.querySelector('.viewer');
    viewer.style.width = '100vw';
    viewer.style.height = '100vh';
    
    // Re-inicializa o visualizador para a tela cheia
    initViewer(containerId, 'imagens/' + containerId + '.jpg');
}
