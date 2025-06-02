// Config Firebase - use seus dados
const firebaseConfig = {
    apiKey: "AIzaSyDhq3Slj9tR5tZbGsISTC3YgBF3CMFBTm4",
    authDomain: "gestor-de-pedidos-638d0.firebaseapp.com",
    projectId: "gestor-de-pedidos-638d0",
    storageBucket: "gestor-de-pedidos-638d0.appspot.com",
    messagingSenderId: "278380207122",
    appId: "1:278380207122:web:ecf1923669c7f8a2824ccb",
    measurementId: "G-DSRE0NQB7Y"
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const pedidosRef = db.collection("pedidos");
  const auth = firebase.auth();
  
  const loginForm = document.getElementById("loginForm");
  const logoutBtn = document.getElementById("logoutBtn");
  const conteudo = document.getElementById("conteudo");
  const userInfo = document.getElementById("userInfo");
  const form = document.getElementById("pedidoForm");
  const pedidosContainer = document.getElementById("pedidosContainer");
  const installBtn = document.getElementById("installBtn");
  
  // Login
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
  
    try {
      await auth.signInWithEmailAndPassword(email, senha);
      loginForm.reset();
    } catch (error) {
      alert("Erro ao entrar: " + error.message);
    }
  });
  
  // Logout
  logoutBtn.addEventListener("click", () => auth.signOut());
  
  // Controle de autenticação
  auth.onAuthStateChanged(user => {
    if (user) {
      conteudo.style.display = "block";
      loginForm.style.display = "none";
      logoutBtn.style.display = "inline-block";
      userInfo.textContent = `👤 ${user.email}`;
    } else {
      conteudo.style.display = "none";
      loginForm.style.display = "block";
      logoutBtn.style.display = "none";
      userInfo.textContent = "";
    }
  });
  
  // Função para renderizar pedido
  function renderPedido(doc) {
    const data = doc.data();
  
    const li = document.createElement("li");
    li.classList.add("pedido");
  
    // Verificar se a data do pedido é igual à data atual (só data, sem hora)
    const hoje = new Date();
    const dataPedido = data.dataHoraEntrega ? new Date(data.dataHoraEntrega) : null;
    
    // Função para comparar só dia, mês e ano
    function mesmaData(d1, d2) {
      return d1 && d2 &&
        d1.getDate() === d2.getDate() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getFullYear() === d2.getFullYear();
    }
    
    if (mesmaData(hoje, dataPedido)) {
      li.classList.add("piscando-fundo"); // piscar fundo verde se o pedido é hoje
    }
  
    const statusClass = data.status === "em_producao" ? "vermelho piscando" : 
                        data.status === "entregue" ? "verde" : "";
  
    li.innerHTML = `
      <div><strong>${data.cliente}</strong> (${data.whatsapp})</div>
      <div>${data.descricao}</div>
      <div><strong>Entrega:</strong> ${data.endereco}</div>
      <div><strong>Data/hora entrega:</strong> ${data.dataHoraEntrega || 'Não definido'}</div>
      <div><strong>Valor do pedido:</strong> R$ ${data.valorPedido?.toFixed(2) || '0.00'}</div>
      <div><strong>Valor pago:</strong> R$ ${data.valorPago?.toFixed(2) || '0.00'}</div>
      <div><span class="status ${statusClass}"></span> ${data.status.replace(/_/g, " ")}</div>
  
      <div class="botoes">
        <button class="producao-btn">Em produção</button>
        <button class="entregue-btn">Finalizado</button>
        <button class="editar-btn">Editar</button>
        <button class="apagar-btn">Apagar</button>
      </div>
    `;
  
    // Botões de ação
    li.querySelector(".producao-btn").onclick = () =>
      pedidosRef.doc(doc.id).update({ status: "em_producao" });
  
    li.querySelector(".entregue-btn").onclick = () =>
      pedidosRef.doc(doc.id).update({ status: "entregue" });
  
    li.querySelector(".editar-btn").onclick = () => editarPedido(doc);
  
    li.querySelector(".apagar-btn").onclick = async () => {
      if (confirm("Quer mesmo apagar esse pedido?")) {
        try {
          await pedidosRef.doc(doc.id).delete();
        } catch (error) {
          alert("Erro ao apagar: " + error.message);
        }
      }
    };
  
    return li;
  }
  
  // Atualiza pedidos em tempo real, movendo os antigos para o final
pedidosRef.orderBy("dataHoraEntrega").onSnapshot(snapshot => {
  pedidosContainer.innerHTML = "";

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0); // Zera hora para comparar só a data

  const pedidosAtuaisEFuturos = [];
  const pedidosAntigos = [];

  snapshot.forEach(doc => {
    const data = doc.data();
    const dataEntrega = data.dataHoraEntrega ? new Date(data.dataHoraEntrega) : null;

    if (dataEntrega && dataEntrega < hoje) {
      pedidosAntigos.push(doc); // Data anterior a hoje
    } else {
      pedidosAtuaisEFuturos.push(doc); // Data de hoje ou futura, ou sem data
    }
  });

  [...pedidosAtuaisEFuturos, ...pedidosAntigos].forEach(doc => {
    pedidosContainer.appendChild(renderPedido(doc));
  });
});

  
  
  // Adicionar ou editar pedido
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const pedido = {
      cliente: form.cliente.value.trim(),
      whatsapp: form.whatsapp.value.trim(),
      descricao: form.descricao.value.trim(),
      endereco: form.retirada.checked ? "Retirada" : form.endereco.value.trim(),
      dataHoraEntrega: form.dataHoraEntrega.value,
      valorPedido: parseFloat(form.valorPedido.value) || 0,
      valorPago: parseFloat(form.valorPago.value) || 0,
      status: "novo",
      criadoEm: firebase.firestore.FieldValue.serverTimestamp()
    };
  
    const editId = form.getAttribute("data-edit-id");
  
    try {
      if (editId) {
        await pedidosRef.doc(editId).update({
          cliente: pedido.cliente,
          whatsapp: pedido.whatsapp,
          descricao: pedido.descricao,
          endereco: pedido.endereco,
          dataHoraEntrega: pedido.dataHoraEntrega,
          valorPedido: pedido.valorPedido,
          valorPago: pedido.valorPago,
        });
        
  
        form.removeAttribute("data-edit-id");
        form.querySelector("button[type='submit']").textContent = "Adicionar pedido";
      } else {
        await pedidosRef.add(pedido);
      }
      form.reset();
    } catch (error) {
      alert("Erro ao registrar pedido: " + error.message);
    }
  });
  
  
  // Preenche formulário para edição
  function editarPedido(doc) {
    console.log("Editando pedido:", doc.id);
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

  form.dataHoraEntrega.value = data.dataHoraEntrega || "";
  form.valorPedido.value = data.valorPedido || "";
  form.valorPago.value = data.valorPago || "";

  form.setAttribute("data-edit-id", doc.id);
  form.querySelector("button[type='submit']").textContent = "Salvar alterações";
}

  
  // Botão para instalar PWA
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
  