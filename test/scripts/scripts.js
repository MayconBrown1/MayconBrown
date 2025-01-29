document.addEventListener("DOMContentLoaded", () => {
    const produtos = [
        { id: 1, nome: "Hambúrguer", preco: 15.00, img: "https://via.placeholder.com/150" },
        { id: 2, nome: "Pizza", preco: 30.00, img: "https://via.placeholder.com/150" },
        { id: 3, nome: "Hot Dog", preco: 12.00, img: "https://via.placeholder.com/150" },
        { id: 4, nome: "Batata Frita", preco: 10.00, img: "https://via.placeholder.com/150" },
        { id: 5, nome: "Refrigerante", preco: 7.00, img: "https://via.placeholder.com/150" },
        { id: 6, nome: "Milkshake", preco: 14.00, img: "https://via.placeholder.com/150" },
        { id: 7, nome: "Sorvete", preco: 9.00, img: "https://via.placeholder.com/150" },
        { id: 8, nome: "Café", preco: 5.00, img: "https://via.placeholder.com/150" },
        { id: 9, nome: "Sanduíche", preco: 18.00, img: "https://via.placeholder.com/150" },
        { id: 10, nome: "Salada", preco: 20.00, img: "https://via.placeholder.com/150" }
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
                <h3>${produto.nome}</h3>
                <p>R$ ${produto.preco.toFixed(2)}</p>
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
        document.getElementById("modal-carrinho").style.display = "block";
    };

    window.fecharCarrinho = function () {
        document.getElementById("modal-carrinho").style.display = "none";
    };

    document.getElementById("finalizar-compra").addEventListener("click", () => {
        if (carrinho.length === 0) {
            alert("Seu carrinho está vazio!");
            return;
        }

        let mensagem = "*Pedido via Cardápio Online*%0A%0A";
        carrinho.forEach(item => {
            mensagem += `🍔 ${item.nome} - ${item.quantidade}x R$${(item.preco * item.quantidade).toFixed(2)}%0A`;
        });

        let total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
        mensagem += `%0A💰 *Total: R$${total.toFixed(2)}*%0A`;
        mensagem += `%0A📌 *Forma de Pagamento:* `;  // Pode adicionar opções depois

        let telefone = "5584996798304";
        let url = `https://api.whatsapp.com/send?phone=${telefone}&text=${mensagem}`;
        window.open(url, "_blank");
    });

    renderizarProdutos();
});