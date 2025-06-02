// 🔥 Firebase config - substitua pelos seus dados se mudar
const firebaseConfig = {
    apiKey: "AIzaSyDhq3Slj9tR5tZbGsISTC3YgBF3CMFBTm4",
    authDomain: "gestor-de-pedidos-638d0.firebaseapp.com",
    projectId: "gestor-de-pedidos-638d0",
    storageBucket: "gestor-de-pedidos-638d0.appspot.com",
    messagingSenderId: "278380207122",
    appId: "1:278380207122:web:ecf1923669c7f8a2824ccb",
    measurementId: "G-DSRE0NQB7Y"
  };
  
  // Inicialização do Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const pedidosRef = db.collection("pedidos");
  const auth = firebase.auth();
const loginForm = document.getElementById("loginForm");
const logoutBtn = document.getElementById("logoutBtn");
const conteudo = document.getElementById("conteudo");
const userInfo = document.getElementById("userInfo");

// Login com email e senha
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
  
    auth.signInWithEmailAndPassword(email, senha)
      .then(() => {
        loginForm.reset();
      })
      .catch((error) => {
        alert("Erro ao entrar: " + error.message);
      });
  });

  // Logout
logoutBtn.addEventListener("click", () => {
    auth.signOut();
  });
  
  // Controle do estado de autenticação
  auth.onAuthStateChanged(user => {
    if (user) {
      conteudo.style.display = "block";
      loginForm.style.display = "none";
      logoutBtn.style.display = "inline-block";
      userInfo.innerHTML = `👤 ${user.email}`;
    } else {
      conteudo.style.display = "none";
      loginForm.style.display = "inline-block";
      logoutBtn.style.display = "none";
      userInfo.innerHTML = "";
    }
  });

  
  // Referências ao DOM
  const form = document.getElementById("pedidoForm");
  const pedidosContainer = document.getElementById("pedidosContainer");
  
  // Submissão do formulário
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const pedido = {
        cliente: form.cliente.value,
        whatsapp: form.whatsapp.value,
        descricao: form.descricao.value,
        endereco: form.retirada.checked ? "Retirada" : form.endereco.value,
        dataHoraEntrega: form.dataHoraEntrega.value,
        valorPedido: parseFloat(form.valorPedido.value),
        valorPago: parseFloat(form.valorPago.value),
        status: "novo",
        criadoEm: firebase.firestore.FieldValue.serverTimestamp()
      };
      
      
  
    const editId = form.getAttribute("data-edit-id");
  
    try {
      if (editId) {
        // Atualiza pedido existente, não muda o status nem criadoEm
        await pedidosRef.doc(editId).update({
            cliente: pedido.cliente,
            whatsapp: pedido.whatsapp,
            descricao: pedido.descricao,
            endereco: pedido.endereco,
            valorPedido: pedido.valorPedido,
            valorPago: pedido.valorPago,
          });
          
        form.removeAttribute("data-edit-id");
        form.querySelector("button[type='submit']").textContent = "Adicionar pedido";
      } else {
        // Cria pedido novo
        await pedidosRef.add(pedido);
      }
      form.reset();
    } catch (error) {
      alert("Erro ao registrar pedido: " + error.message);
      console.error(error);
    }
  });
  
  
  // Renderiza cada pedido
  function renderPedido(doc) {
    const data = doc.data();
  
    const li = document.createElement("li");
    li.classList.add("pedido");
  
    const statusClass = data.status === "em_producao" ? "vermelho" :
                        data.status === "entregue" ? "verde" : "";
  
                        li.innerHTML = `
  <div><strong>${data.cliente}</strong> (${data.whatsapp})</div>
  <div>${data.descricao}</div>
  <div><strong>Entrega:</strong> ${data.endereco}</div>
  <div><strong>Data/hora entrega:</strong> ${data.dataHoraEntrega || 'Não definido'}</div>
  <div><strong>Valor do pedido:</strong> R$ ${data.valorPedido?.toFixed(2) || '0.00'}</div>
  <div><strong>Valor pago:</strong> R$ ${data.valorPago?.toFixed(2) || '0.00'}</div>
  <div><span class="status ${statusClass}"></span> ${data.status.replace("_", " ")}</div>

  <div class="botoes">
    <button class="producao-btn">Em produção</button>
    <button class="entregue-btn">Finalizado</button>
    <button class="editar-btn">Editar</button>
    <button class="apagar-btn">Apagar</button>
  </div>
`;

                      
                      // Atualizar status
  
  // Botão Editar
  li.querySelector(".editar-btn").onclick = () => editarPedido(doc);
  
  // Botão Apagar
  li.querySelector(".apagar-btn").onclick = async () => {
    if (confirm("Quer mesmo apagar esse pedido?")) {
      try {
        await pedidosRef.doc(doc.id).delete();
      } catch (error) {
        alert("Erro ao apagar: " + error.message);
      }
    }
  };

  function editarPedido(doc) {
    const data = doc.data();
    
    form.cliente.value = data.cliente;
    form.whatsapp.value = data.whatsapp;
    form.descricao.value = data.descricao;
    if (data.endereco === "Retirada") {
      form.retirada.checked = true;
      form.endereco.value = "";
    } else {
      form.retirada.checked = false;
      form.endereco.value = data.endereco;
    }
    form.valorPedido.value = data.valorPedido;
form.valorPago.value = data.valorPago;

  
    // Adiciona um atributo para salvar o id do pedido que está sendo editado
    form.setAttribute("data-edit-id", doc.id);
  
    // Muda o texto do botão para indicar que está em modo edição
    form.querySelector("button[type='submit']").textContent = "Salvar alterações";
  }
  
  let deferredPrompt;
const installBtn = document.getElementById("installBtn");

// Evento que dispara quando o app pode ser instalado
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  // Mostra o botão para instalar
  installBtn.style.display = "inline-block";
});

// Quando o usuário clica no botão
installBtn.addEventListener("click", async () => {
  // Esconde o botão
  installBtn.style.display = "none";

  if (!deferredPrompt) {
    // Se não tiver o evento, não tenta instalar
    return;
  }

  deferredPrompt.prompt();

  const { outcome } = await deferredPrompt.userChoice;

  if (outcome === "accepted") {
    console.log("Usuário aceitou a instalação");
  } else {
    console.log("Usuário rejeitou a instalação");
  }

  deferredPrompt = null;
});

// Evento que detecta se o app já está instalado (no Windows, Mac e mobile)
window.addEventListener("appinstalled", () => {
  console.log("App foi instalado");
  // Esconde o botão
  installBtn.style.display = "none";
});

// Além disso, para detectar se o app já está rodando em modo PWA ou instalado, 
// para esconder o botão direto ao carregar a página
function checkIfAppInstalled() {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    || window.navigator.standalone === true; // para iOS
  if (isStandalone) {
    installBtn.style.display = "none";
  }
}

checkIfAppInstalled();


  
    li.querySelector(".producao-btn").onclick = () =>
      pedidosRef.doc(doc.id).update({ status: "em_producao" });
  
    li.querySelector(".entregue-btn").onclick = () =>
      pedidosRef.doc(doc.id).update({ status: "entregue" });
  
    return li;
  }
  
  // Atualiza os pedidos em tempo real
  function atualizarPedidos(snapshot) {
    pedidosContainer.innerHTML = "";
    snapshot.forEach((doc) => {
        const pedidoEl = renderPedido(doc);
        pedidosContainer.appendChild(pedidoEl);
      });      
  }
  
  // Listener de atualização em tempo real
  pedidosRef.orderBy("dataHoraEntrega").onSnapshot(atualizarPedidos);

  