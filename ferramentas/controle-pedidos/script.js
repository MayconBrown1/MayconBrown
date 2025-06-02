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
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const conteudo = document.getElementById("conteudo");
const userInfo = document.getElementById("userInfo");

loginBtn.addEventListener("click", () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
});

logoutBtn.addEventListener("click", () => {
  auth.signOut();
});

auth.onAuthStateChanged(user => {
  if (user) {
    conteudo.style.display = "block";
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
    userInfo.innerHTML = `👤 ${user.displayName}`;
  } else {
    conteudo.style.display = "none";
    loginBtn.style.display = "inline-block";
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
      valor: parseFloat(form.valor.value),
      pago: form.pago.value,
      status: "novo",
      criadoEm: firebase.firestore.FieldValue.serverTimestamp()
    };
  
    try {
      await pedidosRef.add(pedido);
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
      <div><strong>Valor:</strong> R$ ${data.valor.toFixed(2)}</div>
      <div><strong>Pagamento:</strong> ${
        data.pago === "nao" ? "Não pago" :
        data.pago === "50" ? "Pago 50%" : "Pago 100%"
      }</div>
      <div><span class="status ${statusClass}"></span> ${data.status.replace("_", " ")}</div>
  
      <div class="botoes">
        <button class="producao-btn">Em produção</button>
        <button class="entregue-btn">Finalizado</button>
      </div>
    `;
  
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
  pedidosRef.orderBy("criadoEm", "desc").onSnapshot(atualizarPedidos);
  