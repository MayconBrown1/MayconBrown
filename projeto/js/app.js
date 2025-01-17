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
