document.addEventListener("DOMContentLoaded", () => {
    const produtos = {
        Pasteis: [
            { id: 1, nome: "Pastel de Carne", preco: 10.00, img: "https://mayconbrown.com.br/img/svg/icone.svg", ingredientes: "Carne moída, Massa de pastel." },
            { id: 2, nome: "Pastel de Frango", preco: 12.00, img: "https://mayconbrown.com.br/img/svg/icone.svg", ingredientes: "Frango desfiado, Massa de pastel." }
        ],
        Hamburgues: [
            { id: 3, nome: "Hambúrguer", preco: 15.00, img: "https://mayconbrown.com.br/img/svg/icone.svg", ingredientes: "Pão de hambúrguer, Carne bovina, Queijo cheddar, Alface, Tomate, Molho especial." }
        ],
        Pizzas: [
            { id: 4, nome: "Pizza", preco: 30.00, img: "https://mayconbrown.com.br/img/svg/icone.svg", ingredientes: "Massa de pizza, Molho de tomate, Queijo mussarela, Orégano, Pepperoni (opcional)." }
        ],
        HotDog: [
            { id: 5, nome: "Hot Dog", preco: 12.00, img: "https://mayconbrown.com.br/img/svg/icone.svg", ingredientes: "Pão de hot dog, Salsicha, Ketchup, Mostarda, Maionese, Batata palha." }
        ],
        Acai: [
            { id: 6, nome: "Açaí", preco: 20.00, img: "https://mayconbrown.com.br/img/svg/icone.svg", ingredientes: "Açaí, Granola, Banana, Mel." }
        ],
        Petiscos: [
            { id: 7, nome: "Batata Frita", preco: 10.00, img: "https://mayconbrown.com.br/img/svg/icone.svg", ingredientes: "Batata, Sal, Óleo para fritura." }
        ],
        Bebidas: [
            { id: 8, nome: "Refrigerante", preco: 7.00, img: "https://mayconbrown.com.br/img/svg/icone.svg", ingredientes: "Água gaseificada, Açúcar, Corantes e aromatizantes." },
            { id: 9, nome: "Milkshake", preco: 14.00, img: "https://mayconbrown.com.br/img/svg/icone.svg", ingredientes: "Leite, Sorvete (chocolate, baunilha ou morango), Chantilly (opcional)." }
        ]
    };

    const bairrosTaxas = {
        "Bela Parnamirim": 5.00,
        "Boa Esperança": 7.50,
        "Cajupiranga": 6.00,
        "Centro": 4.00,
        "Cohabinal": 8.00,
        "Liberdade": 6.50,
        "Monte Castelo": 5.50,
        "Nova Esperança": 7.00,
        "Parque de Exposições": 6.00,
        "Passagem de Areia": 8.50,
        "Rosa dos Ventos": 7.00,
        "Santa Tereza": 5.00,
        "Santos Reis": 6.00,
        "Vale do Sol": 5.50,
        "Vida Nova": 7.00
    };

    const menu = document.getElementById("menu");
    const carrinhoLista = document.getElementById("carrinho-lista");
    const totalElemento = document.getElementById("total");
    const contadorCarrinho = document.getElementById("contador-carrinho");
    const taxaEntregaElemento = document.getElementById("taxa-entrega");
    const nomeClienteInput = document.getElementById("nome-cliente");
    const telefoneInput = document.getElementById("telefone");
    let carrinho = [];

    // Função para renderizar as categorias
    function renderizarCategorias() {
        const categoriasContainer = document.getElementById("categorias");
        Object.keys(produtos).forEach(categoria => {
            const button = document.createElement("button");
            button.textContent = categoria;
            button.classList.add("categoria");
            button.onclick = () => mostrarCategoria(categoria);
            categoriasContainer.appendChild(button);
        });
    }

    // Função para mostrar os produtos de uma categoria
    function mostrarCategoria(categoria) {
        const produtosContainer = document.getElementById("produtos");
        produtosContainer.innerHTML = ""; // Limpa os produtos da tela

        produtos[categoria].forEach(produto => {
            const div = document.createElement("div");
            div.classList.add("produto");
            div.innerHTML = `
                <img src="${produto.img}" alt="${produto.nome}">
                <div>
                    <h3>${produto.nome}</h3>
                    <p>R$ ${produto.preco.toFixed(2)}</p>
                    <p>${produto.ingredientes}</p> <!-- Exibe somente os ingredientes aqui -->
                </div>
                <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar</button>
            `;
            produtosContainer.appendChild(div);
        });
    }

    // Função para renderizar a primeira categoria
    function renderizarProdutosIniciais() {
        mostrarCategoria("Pasteis"); // Exibe a primeira categoria, "Pasteis", por padrão
    }

    window.mostrarIngredientes = function (id) {
        const produto = produtos.find(p => p.id === id);
        alert(`Ingredientes de ${produto.nome}:\n${produto.ingredientes}`);
    };

    window.adicionarAoCarrinho = function (id) {
        // Encontrar o produto com base no ID, passando pela chave das categorias
        let produto;
        for (const categoria in produtos) {
            produto = produtos[categoria].find(p => p.id === id);
            if (produto) break;  // Se encontrado, sai do loop
        }

        // Se o produto foi encontrado, adiciona ao carrinho
    const itemCarrinho = carrinho.find(p => p.id === id);

    if (itemCarrinho) {
        itemCarrinho.quantidade++;
    } else {
        carrinho.push({ ...produto, quantidade: 1 });
    }

        atualizarCarrinho();
    };

    function atualizarCarrinho() {
        carrinhoLista.innerHTML = "";
        let total = 0;
        let quantidadeTotal = 0;

        carrinho.forEach(item => {
            total += item.preco * item.quantidade;
            quantidadeTotal += item.quantidade;

            const li = document.createElement("li");
            li.innerHTML = `${item.nome} - R$${item.preco.toFixed(2)} x ${item.quantidade} 
                <button onclick="removerDoCarrinho(${item.id})">❌</button>`;
            carrinhoLista.appendChild(li);
        });

        const taxaEntrega = calcularTaxaEntrega();
        total += taxaEntrega;
        taxaEntregaElemento.textContent = `Taxa de entrega: R$ ${taxaEntrega.toFixed(2)}`;
        totalElemento.textContent = total.toFixed(2);
        contadorCarrinho.textContent = quantidadeTotal;
    }

    window.removerDoCarrinho = function (id) {
        carrinho = carrinho.filter(p => p.id !== id);
        atualizarCarrinho();
    };

    window.abrirCarrinho = function () {
        document.getElementById("modal-carrinho").style.display = "flex";
    };

    window.fecharCarrinho = function () {
        document.getElementById("modal-carrinho").style.display = "none";
    };

    document.getElementById("finalizar-compra").addEventListener("click", () => {
        if (carrinho.length === 0) {
            alert("Adicione produtos ao carrinho.");
            return;
        }

        const formaPagamento = document.getElementById("forma-pagamento").value;
    const endereco = document.getElementById("endereco").value;
    const nomeCliente = nomeClienteInput.value; // Nome do cliente
    const telefone = telefoneInput.value; // Telefone do cliente
    const observacao = document.getElementById("observacao").value; // Observação do cliente

    let valorPago = 0;
    if (formaPagamento === "Espécie") {
        valorPago = parseFloat(document.getElementById("valor-pago").value) || 0;
    }
    let mensagem = `Olá! Quero fazer um pedido.\n\nProdutos:\n`;
    carrinho.forEach(item => {
        mensagem += `${item.nome} - R$${(item.preco * item.quantidade).toFixed(2)} x ${item.quantidade}\n`;
    });

    const taxaEntrega = calcularTaxaEntrega();
    mensagem += `\nTaxa de entrega: R$ ${taxaEntrega.toFixed(2)}\n`;
    mensagem += `\nTotal: R$ ${totalElemento.textContent}\n`;

    mensagem += `\nTotal: R$ ${totalElemento.textContent}\n`;

    if (formaPagamento === "Espécie") {
        const troco = valorPago - parseFloat(totalElemento.textContent);
        mensagem += `Pagamento: R$ ${valorPago.toFixed(2)}\n`;
        mensagem += `Troco: R$ ${troco.toFixed(2)}\n`;
    }

    mensagem += `Forma de Pagamento: ${formaPagamento}\n\n`;  // Forma de pagamento
    mensagem += `\nEndereço: ${endereco}\n`;
    mensagem += `Nome: ${nomeCliente}\n`;  // Nome do cliente
    mensagem += `Telefone: ${telefone}\n`;  // Telefone do cliente

    if (observacao) {
        mensagem += `\nObservação: ${observacao}\n`;  // Inclui a observação, caso haja
    }

    // Enviar a mensagem para o WhatsApp
    const link = `https://wa.me/5584996798304?text=${encodeURIComponent(mensagem)}`;
    window.open(link, "_blank");
});

    window.mostrarCampoEndereco = function () {
        const tipoEntrega = document.getElementById("tipo-entrega").value;
        const campoEndereco = document.getElementById("campo-endereco");

        // Mostrar o campo de endereço somente se a opção for "Entrega"
        if (tipoEntrega === "Entrega") {
            campoEndereco.style.display = "block";
        } else {
            campoEndereco.style.display = "none";
        }
    };

    window.mostrarCamposFormaPagamento = function () {
        const formaPagamento = document.getElementById("forma-pagamento").value;
        const campoValorPago = document.getElementById("campo-valor-pago");

        // Mostrar o campo de valor pago somente se a opção for "Espécie"
        if (formaPagamento === "Espécie") {
            campoValorPago.style.display = "block";
        } else {
            campoValorPago.style.display = "none";
        }
    };

    // Função para calcular a taxa de entrega com base no bairro
    function calcularTaxaEntrega() {
        const bairro = document.getElementById("bairro").value;
        if (bairrosTaxas[bairro]) {
            return bairrosTaxas[bairro];
        } else {
            return 0;
        }
    }

    // Atualizar a taxa de entrega sempre que o bairro for alterado
    document.getElementById("bairro").addEventListener("change", atualizarCarrinho);

    // Função para inicializar
    function inicializar() {
        renderizarCategorias();
        renderizarProdutosIniciais();
    }

    inicializar();
});
