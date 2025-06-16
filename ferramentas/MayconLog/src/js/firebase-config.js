
// Configuração do Firebase - MayconLog
const firebaseConfig = {
    apiKey: "AIzaSyBjFcs1Qa8mM4r9h1jhZNK6FVo2nLRaBrg",
    authDomain: "cardapio-lella-salgados.firebaseapp.com",
    projectId: "cardapio-lella-salgados",
    storageBucket: "cardapio-lella-salgados.firebasestorage.app",
    messagingSenderId: "768114063966",
    appId: "1:768114063966:web:228f8f855f6fef54b992cf"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Referências dos serviços
const auth = firebase.auth();
const db = firebase.firestore();

// Função para verificar se o usuário está logado
async function verificarLogin() {
    return new Promise((resolve) => {
        auth.onAuthStateChanged((user) => {
            resolve(user);
        });
    });
}

// Função para fazer logout
async function logout() {
    try {
        await auth.signOut();
        localStorage.removeItem('userType');
        localStorage.removeItem('userApproved');
        window.location.href = '/';
    } catch (error) {
        console.error('Erro no logout:', error);
    }
}

// Funções para mostrar mensagens
function mostrarLoading() {
    const loading = document.getElementById('loading');
    if (loading) loading.classList.remove('hidden');
}

function esconderLoading() {
    const loading = document.getElementById('loading');
    if (loading) loading.classList.add('hidden');
}

function mostrarErro(mensagem) {
    // Criar toast de erro
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-transform duration-300 translate-x-full';
    toast.innerHTML = `
        <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>
            ${mensagem}
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Animar entrada
    setTimeout(() => {
        toast.classList.remove('translate-x-full');
    }, 100);
    
    // Remover após 5 segundos
    setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 5000);
}

function mostrarSucesso(mensagem) {
    // Criar toast de sucesso
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-transform duration-300 translate-x-full';
    toast.innerHTML = `
        <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            ${mensagem}
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Animar entrada
    setTimeout(() => {
        toast.classList.remove('translate-x-full');
    }, 100);
    
    // Remover após 5 segundos
    setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 5000);
}

// Função para proteger páginas que requerem login
async function protegerPagina(tipoPermitido) {
    const user = await verificarLogin();
    
    if (!user) {
        window.location.href = '/';
        return false;
    }
    
    if (tipoPermitido) {
        try {
            const userDoc = await db.collection('usuarios').doc(user.uid).get();
            if (!userDoc.exists) {
                await auth.signOut();
                window.location.href = '/';
                return false;
            }
            
            const userData = userDoc.data();
            if (userData.tipo !== tipoPermitido) {
                window.location.href = '/';
                return false;
            }
            
            // Para loja e entregador, verificar se está aprovado
            if ((userData.tipo === 'loja' || userData.tipo === 'entregador') && !userData.aprovado) {
                mostrarErro('Sua conta ainda não foi aprovada pelo administrador');
                return false;
            }
        } catch (error) {
            console.error('Erro ao verificar permissões:', error);
            window.location.href = '/';
            return false;
        }
    }
    
    return true;
}

// Função para gerar ID único para pedidos
function gerarIdPedido() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Função para formatar data
function formatarData(timestamp) {
    if (!timestamp) return 'N/A';
    const data = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return data.toLocaleString('pt-BR');
}

// Função para formatar moeda
function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

console.log('Firebase configurado com projeto:', firebaseConfig.projectId);
