document.addEventListener("DOMContentLoaded", () => {
    const produtos = [
        { id: 1, nome: "Hambúrguer", preco: 15.00, img: "https://mayconbrown.com.br/img/svg/icone.svg" },
        { id: 2, nome: "Pizza", preco: 30.00, img: "https://mayconbrown.com.br/img/svg/icone.svg" },
        { id: 3, nome: "Hot Dog", preco: 12.00, img: "https://mayconbrown.com.br/img/svg/icone.svg" },
        { id: 4, nome: "Batata Frita", preco: 10.00, img: "https://mayconbrown.com.br/img/svg/icone.svg" },
        { id: 5, nome: "Refrigerante", preco: 7.00, img: "https://mayconbrown.com.br/img/svg/icone.svg" },
        { id: 6, nome: "Milkshake", preco: 14.00, img: "https://mayconbrown.com.br/img/svg/icone.svg" },
        { id: 7, nome: "Sorvete", preco: 9.00, img: "https://mayconbrown.com.br/img/svg/icone.svg" },
        { id: 8, nome: "Café", preco: 5.00, img: "https://mayconbrown.com.br/img/svg/icone.svg" },
        { id: 9, nome: "Sanduíche", preco: 18.00, img: "https://mayconbrown.com.br/img/svg/icone.svg" },
        { id: 10, nome: "Salada", preco: 20.00, img: "https://mayconbrown.com.br/img/svg/icone.svg" }
    ];

    const menu = document.getElementById("menu");
    const carrinhoLista = document.getElementById("carrinho-lista");
    const totalElemento = document.getElementById("total");
    const contadorCarrinho = document.getElementById("contador-carrinho");
    let carrinho = [];

    function renderizarProdutos() {
        produtos.forEach(produto => {
            const div = document.createElement("div");
            div.classList.add("produto");
            div.innerHTML = `
                <img src="${produto.img}" alt="${produto.nome}">
                <div>
                    <h3>${produto.nome}</h3>
                    <p>R$ ${produto.preco.toFixed(2)}</p>
                </div>
                <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar</button>
            `;
            menu.appendChild(div);
        });
    }

    window.adicionarAoCarrinho = function (id) {
        const produto = produtos.find(p => p.id === id);
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

        let valorPago = 0;
        if (formaPagamento === "Espécie") {
            valorPago = parseFloat(document.getElementById("valor-pago").value) || 0;
        }

        let mensagem = `Olá! Quero fazer um pedido.\n\nProdutos:\n`;
        carrinho.forEach(item => {
            mensagem += `${item.nome} - R$${(item.preco * item.quantidade).toFixed(2)} x ${item.quantidade}\n`;
        });

        mensagem += `\nTotal: R$ ${totalElemento.textContent}\n`;

        if (formaPagamento === "Espécie") {
            const troco = valorPago - parseFloat(totalElemento.textContent);
            mensagem += `Pagamento em Espécie: R$ ${valorPago.toFixed(2)}\n`;
            mensagem += `Troco: R$ ${troco.toFixed(2)}\n`;
        }

        mensagem += `\nEndereço: ${endereco}\n`;

        // Enviar a mensagem para o WhatsApp
        const link = `https://wa.me/5584996798304?text=${encodeURIComponent(mensagem)}`;
        window.open(link, "_blank");
    });

    // Função para mostrar ou esconder o campo de endereço baseado na opção de entrega
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

    // Função para mostrar ou esconder o campo de valor pago baseado na opção "Espécie"
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

    renderizarProdutos();
});
