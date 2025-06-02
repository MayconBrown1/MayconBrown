// 🔥 Firebase config - substitua pelos seus dados
const firebaseConfig = {
    apiKey: "AIzaSyDhq3Slj9tR5tZbGsISTC3YgBF3CMFBTm4",
    authDomain: "gestor-de-pedidos-638d0.firebaseapp.com",
    projectId: "gestor-de-pedidos-638d0",
    storageBucket: "gestor-de-pedidos-638d0.firebasestorage.app",
    messagingSenderId: "278380207122",
    appId: "1:278380207122:web:ecf1923669c7f8a2824ccb",
    measurementId: "G-DSRE0NQB7Y"
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const pedidosRef = db.collection("pedidos");
  
  const form = document.getElementById("pedidoForm");
  const pedidosContainer = document.getElementById("pedidosContainer");
  
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
  
    await pedidosRef.add(pedido);
    form.reset();
  });
  
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
  
  function atualizarPedidos(snapshot) {
    pedidosContainer.innerHTML = "";
    snapshot.forEach((doc) => {
      const pedidoEl = renderPedido(doc);
      pedidosContainer.appendChild(pedidoEl);
    });
  }
  
  pedidosRef.orderBy("criadoEm", "desc").onSnapshot(atualizarPedidos);
  