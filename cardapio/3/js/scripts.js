
document.addEventListener("DOMContentLoaded", () => {
    const produtos = {
        Pasteis: [
            { id: 1, nome: "Pastel de Carne Moída", preco: 5.99, img: "https://mayconbrown.com.br/cardapio/1/img/pastel.webp", ingredientes: "Carne moída, Cebola, Alho, Azeite, Sal, Pimenta-do-reino." },
            { id: 2, nome: "Pastel de Frango Desfiado", preco: 6.50, img: "https://mayconbrown.com.br/cardapio/1/img/pastel.webp", ingredientes: "Frango desfiado, Cebola, Alho, Azeitona, Milho, Sal, Pimenta-do-reino." },
            { id: 3, nome: "Pastel de Queijo e Presunto", preco: 4.99, img: "https://mayconbrown.com.br/cardapio/1/img/pastel.webp", ingredientes: "Queijo mussarela, Presunto, Orégano." },
            { id: 4, nome: "Pastel de Calabresa com Queijo", preco: 6.00, img: "https://mayconbrown.com.br/cardapio/1/img/pastel.webp", ingredientes: "Linguiça calabresa, Queijo mussarela, Cebola, Alho." },
            { id: 5, nome: "Pastel de Camarão com Catupiry", preco: 7.50, img: "https://mayconbrown.com.br/cardapio/1/img/pastel.webp", ingredientes: "Camarão, Catupiry, Alho, Cebola, Coentro." },
            { id: 6, nome: "Pastel de Carne Seca com Abóbora", preco: 6.80, img: "https://mayconbrown.com.br/cardapio/1/img/pastel.webp", ingredientes: "Carne seca desfiada, Abóbora, Alho, Cebola, Sal, Pimenta-do-reino." },
            { id: 7, nome: "Pastel de Frango com Catupiry", preco: 5.90, img: "https://mayconbrown.com.br/cardapio/1/img/pastel.webp", ingredientes: "Frango desfiado, Catupiry, Alho, Cebola, Sal." },
            { id: 8, nome: "Pastel de Pizza (Mussarela, Presunto e Tomate)", preco: 6.20, img: "https://mayconbrown.com.br/cardapio/1/img/pastel.webp", ingredientes: "Queijo mussarela, Presunto, Tomate, Orégano." },
            { id: 9, nome: "Pastel de Palmito com Queijo", preco: 5.50, img: "https://mayconbrown.com.br/cardapio/1/img/pastel.webp", ingredientes: "Palmito, Queijo mussarela, Alho, Cebola, Azeite." },
            { id: 10, nome: "Pastel de Bacalhau com Azeitonas", preco: 7.20, img: "https://mayconbrown.com.br/cardapio/1/img/pastel.webp", ingredientes: "Bacalhau desfiado, Azeitonas verdes, Alho, Cebola, Salsa." }
        ],
        Hamburgues: [
            { id: 11, nome: "Hambúrguer Clássico", preco: 9.99, img: "https://mayconbrown.com.br/cardapio/1/img/Hambúrguer.webp", ingredientes: "Carne bovina, Queijo cheddar, Alface, Tomate, Pão de hambúrguer." },
            { id: 12, nome: "Cheeseburger", preco: 10.50, img: "https://mayconbrown.com.br/cardapio/1/img/Hambúrguer.webp", ingredientes: "Carne bovina, Queijo mussarela, Alface, Pão de hambúrguer, Maionese." },
            { id: 13, nome: "Hambúrguer Bacon", preco: 12.00, img: "https://mayconbrown.com.br/cardapio/1/img/Hambúrguer.webp", ingredientes: "Carne bovina, Bacon, Queijo cheddar, Alface, Tomate, Pão de hambúrguer." },
            { id: 14, nome: "Veggie Burger", preco: 11.00, img: "https://mayconbrown.com.br/cardapio/1/img/Hambúrguer.webp", ingredientes: "Hambúrguer de grão de bico, Alface, Tomate, Pão integral." },
            { id: 15, nome: "Hambúrguer Duplo", preco: 14.50, img: "https://mayconbrown.com.br/cardapio/1/img/Hambúrguer.webp", ingredientes: "Carne bovina, Queijo cheddar, Bacon, Alface, Tomate, Pão de hambúrguer." },
            { id: 16, nome: "Hambúrguer com Molho Barbecue", preco: 13.00, img: "https://mayconbrown.com.br/cardapio/1/img/Hambúrguer.webp", ingredientes: "Carne bovina, Queijo cheddar, Molho barbecue, Alface, Pão de hambúrguer." },
            { id: 17, nome: "Hambúrguer de Frango", preco: 11.50, img: "https://mayconbrown.com.br/cardapio/1/img/Hambúrguer.webp", ingredientes: "Peito de frango, Queijo cheddar, Alface, Pão de hambúrguer, Maionese." },
            { id: 18, nome: "Hambúrguer de Costela", preco: 15.00, img: "https://mayconbrown.com.br/cardapio/1/img/Hambúrguer.webp", ingredientes: "Carne de costela, Queijo cheddar, Alface, Tomate, Molho especial." },
            { id: 19, nome: "Hambúrguer Picanha", preco: 16.00, img: "https://mayconbrown.com.br/cardapio/1/img/Hambúrguer.webp", ingredientes: "Carne de picanha, Queijo prato, Alface, Pão de hambúrguer." },
            { id: 20, nome: "Hambúrguer com Ovo", preco: 13.50, img: "https://mayconbrown.com.br/cardapio/1/img/Hambúrguer.webp", ingredientes: "Carne bovina, Queijo cheddar, Ovo frito, Alface, Tomate, Pão de hambúrguer." }
        ],
        Pizzas: [
            { id: 21, nome: "Pizza Margherita", preco: 12.99, img: "https://mayconbrown.com.br/cardapio/1/img/pizza.webp", ingredientes: "Massa de pizza, Molho de tomate, Queijo mussarela, Manjericão, Orégano." },
            { id: 22, nome: "Pizza Calabresa", preco: 14.50, img: "https://mayconbrown.com.br/cardapio/1/img/pizza.webp", ingredientes: "Massa de pizza, Molho de tomate, Queijo mussarela, Calabresa, Cebola." },
            { id: 23, nome: "Pizza Portuguesa", preco: 16.00, img: "https://mayconbrown.com.br/cardapio/1/img/pizza.webp", ingredientes: "Massa de pizza, Molho de tomate, Queijo mussarela, Presunto, Ovo, Cebola, Azeitonas." },
            { id: 24, nome: "Pizza de Frango com Catupiry", preco: 17.00, img: "https://mayconbrown.com.br/cardapio/1/img/pizza.webp", ingredientes: "Massa de pizza, Molho de tomate, Queijo mussarela, Frango desfiado, Catupiry." },
            { id: 25, nome: "Pizza 4 Queijos", preco: 18.00, img: "https://mayconbrown.com.br/cardapio/1/img/pizza.webp", ingredientes: "Massa de pizza, Molho de tomate, Queijo mussarela, Queijo gorgonzola, Queijo parmesão, Queijo provolone." },
            { id: 26, nome: "Pizza Bacon", preco: 15.00, img: "https://mayconbrown.com.br/cardapio/1/img/pizza.webp", ingredientes: "Massa de pizza, Molho de tomate, Queijo mussarela, Bacon, Cebola." },
            { id: 27, nome: "Pizza Vegetariana", preco: 16.50, img: "https://mayconbrown.com.br/cardapio/1/img/pizza.webp", ingredientes: "Massa de pizza, Molho de tomate, Queijo mussarela, Tomate, Abobrinha, Pimentão, Cogumelos." },
            { id: 28, nome: "Pizza de Peito de Peru", preco: 14.50, img: "https://mayconbrown.com.br/cardapio/1/img/pizza.webp", ingredientes: "Massa de pizza, Molho de tomate, Queijo mussarela, Peito de peru, Alface." },
            { id: 29, nome: "Pizza Frango com Bacon", preco: 17.50, img: "https://mayconbrown.com.br/cardapio/1/img/pizza.webp", ingredientes: "Massa de pizza, Molho de tomate, Queijo mussarela, Frango desfiado, Bacon." },
            { id: 30, nome: "Pizza de Carne Seca", preco: 19.00, img: "https://mayconbrown.com.br/cardapio/1/img/pizza.webp", ingredientes: "Massa de pizza, Molho de tomate, Queijo mussarela, Carne seca desfiada, Cebola." }
        ],
        HotDog: [
            { id: 31, nome: "Hot Dog Tradicional", preco: 12.00, img: "https://mayconbrown.com.br/cardapio/1/img/Hot Dog.webp", ingredientes: "Pão de hot dog, Salsicha, Ketchup, Mostarda, Maionese, Batata palha." },
            { id: 32, nome: "Hot Dog Especial", preco: 14.00, img: "https://mayconbrown.com.br/cardapio/1/img/Hot Dog.webp", ingredientes: "Pão de hot dog, Salsicha, Ketchup, Maionese, Queijo cheddar, Bacon." },
            { id: 33, nome: "Hot Dog Vegetariano", preco: 13.00, img: "https://mayconbrown.com.br/cardapio/1/img/Hot Dog.webp", ingredientes: "Pão de hot dog, Salsicha vegetal, Ketchup, Mostarda, Maionese." },
            { id: 34, nome: "Hot Dog com Frango", preco: 15.00, img: "https://mayconbrown.com.br/cardapio/1/img/Hot Dog.webp", ingredientes: "Pão de hot dog, Peito de frango desfiado, Maionese, Ketchup." },
            { id: 35, nome: "Hot Dog de Carne", preco: 16.00, img: "https://mayconbrown.com.br/cardapio/1/img/Hot Dog.webp", ingredientes: "Pão de hot dog, Carne moída, Ketchup, Maionese, Alface." },
            { id: 36, nome: "Hot Dog com Molho Especial", preco: 17.00, img: "https://mayconbrown.com.br/cardapio/1/img/Hot Dog.webp", ingredientes: "Pão de hot dog, Salsicha, Molho especial, Alface, Tomate." },
            { id: 37, nome: "Hot Dog com Queijo", preco: 13.50, img: "https://mayconbrown.com.br/cardapio/1/img/Hot Dog.webp", ingredientes: "Pão de hot dog, Salsicha, Queijo cheddar, Ketchup, Mostarda." },
            { id: 38, nome: "Hot Dog Bacon", preco: 14.50, img: "https://mayconbrown.com.br/cardapio/1/img/Hot Dog.webp", ingredientes: "Pão de hot dog, Salsicha, Bacon, Ketchup, Mostarda." },
            { id: 39, nome: "Hot Dog com Ovo", preco: 16.50, img: "https://mayconbrown.com.br/cardapio/1/img/Hot Dog.webp", ingredientes: "Pão de hot dog, Salsicha, Ovo frito, Maionese." },
            { id: 40, nome: "Hot Dog Supreme", preco: 18.00, img: "https://mayconbrown.com.br/cardapio/1/img/Hot Dog.webp", ingredientes: "Pão de hot dog, Salsicha, Queijo cheddar, Bacon, Ketchup, Maionese." }
        ],
        Acai: [
            { id: 6, nome: "Açaí Romão e Julieta", preco: 20.00, img: "https://mayconbrown.com.br/cardapio/1/img/Açaí.webp", ingredientes: "Açaí, Granola, Banana, Mel, Morango, Leite condensado." },
            { id: 7, nome: "Açaí Tradicional", preco: 15.00, img: "https://mayconbrown.com.br/cardapio/1/img/Açaí.webp", ingredientes: "Açaí, Granola, Banana." },
            { id: 8, nome: "Açaí Nutella", preco: 25.00, img: "https://mayconbrown.com.br/cardapio/1/img/Açaí.webp", ingredientes: "Açaí, Granola, Banana, Nutella." },
            { id: 9, nome: "Açaí com Frutas Vermelhas", preco: 22.00, img: "https://mayconbrown.com.br/cardapio/1/img/Açaí.webp", ingredientes: "Açaí, Granola, Banana, Morango, Framboesa." },
            { id: 10, nome: "Açaí Tropical", preco: 23.00, img: "https://mayconbrown.com.br/cardapio/1/img/Açaí.webp", ingredientes: "Açaí, Manga, Abacaxi, Granola." },
            { id: 11, nome: "Açaí Protein", preco: 28.00, img: "https://mayconbrown.com.br/cardapio/1/img/Açaí.webp", ingredientes: "Açaí, Granola, Banana, Whey protein." },
            { id: 12, nome: "Açaí Creme de Amendoim", preco: 24.00, img: "https://mayconbrown.com.br/cardapio/1/img/Açaí.webp", ingredientes: "Açaí, Granola, Banana, Creme de amendoim." },
            { id: 13, nome: "Açaí com Leite Ninho", preco: 26.00, img: "https://mayconbrown.com.br/cardapio/1/img/Açaí.webp", ingredientes: "Açaí, Granola, Banana, Leite Ninho." },
            { id: 14, nome: "Açaí Chocolate", preco: 27.00, img: "https://mayconbrown.com.br/cardapio/1/img/Açaí.webp", ingredientes: "Açaí, Granola, Banana, Calda de chocolate." },
            { id: 15, nome: "Açaí com Paçoca", preco: 25.00, img: "https://mayconbrown.com.br/cardapio/1/img/Açaí.webp", ingredientes: "Açaí, Granola, Banana, Paçoca." }
        ],
        Petiscos: [
            { id: 16, nome: "Batata Frita", preco: 10.00, img: "https://mayconbrown.com.br/cardapio/1/img/petiscos.webp", ingredientes: "Batata, Sal, Óleo para fritura." },
            { id: 17, nome: "Batata Frita com Queijo", preco: 15.00, img: "https://mayconbrown.com.br/cardapio/1/img/petiscos.webp", ingredientes: "Batata, Queijo cheddar, Óleo para fritura." },
            { id: 18, nome: "Coxinha", preco: 10.00, img: "https://mayconbrown.com.br/cardapio/1/img/petiscos.webp", ingredientes: "Frango, Massa, Óleo para fritura." },
            { id: 19, nome: "Bolinho de Bacalhau", preco: 18.00, img: "https://mayconbrown.com.br/cardapio/1/img/petiscos.webp", ingredientes: "Bacalhau, Batata, Cebola, Salsinha." },
            { id: 20, nome: "Mandioca Frita", preco: 12.00, img: "https://mayconbrown.com.br/cardapio/1/img/petiscos.webp", ingredientes: "Mandioca, Sal, Óleo para fritura." },
            { id: 21, nome: "Escondidinho de Carne", preco: 20.00, img: "https://mayconbrown.com.br/cardapio/1/img/petiscos.webp", ingredientes: "Carne moída, Purê de batata." },
            { id: 22, nome: "Escondidinho de Frango", preco: 22.00, img: "https://mayconbrown.com.br/cardapio/1/img/petiscos.webp", ingredientes: "Frango desfiado, Purê de batata." },
            { id: 23, nome: "Anéis de Cebola", preco: 14.00, img: "https://mayconbrown.com.br/cardapio/1/img/petiscos.webp", ingredientes: "Cebola, Farinha de trigo, Óleo para fritura." },
            { id: 24, nome: "Frango à Passarinho", preco: 18.00, img: "https://mayconbrown.com.br/cardapio/1/img/petiscos.webp", ingredientes: "Frango, Alho, Sal, Óleo para fritura." },
            { id: 25, nome: "Bolinho de Mandioca", preco: 12.00, img: "https://mayconbrown.com.br/cardapio/1/img/petiscos.webp", ingredientes: "Mandioca, Carne seca, Cebola." }
        ],
        Bebidas: [
            { id: 26, nome: "Refrigerante", preco: 7.00, img: "https://mayconbrown.com.br/cardapio/1/img/bebidas.webp", ingredientes: "Água gaseificada, Açúcar, Corantes e aromatizantes." },
            { id: 27, nome: "Suco Natural de Laranja", preco: 8.00, img: "https://mayconbrown.com.br/cardapio/1/img/bebidas.webp", ingredientes: "Laranja, Açúcar (opcional)." },
            { id: 28, nome: "Suco de Abacaxi com Hortelã", preco: 9.00, img: "https://mayconbrown.com.br/cardapio/1/img/bebidas.webp", ingredientes: "Abacaxi, Hortelã, Açúcar (opcional)." },
            { id: 29, nome: "Milkshake de Chocolate", preco: 14.00, img: "https://mayconbrown.com.br/cardapio/1/img/bebidas.webp", ingredientes: "Leite, Sorvete de chocolate, Chantilly." },
            { id: 30, nome: "Milkshake de Morango", preco: 14.00, img: "https://mayconbrown.com.br/cardapio/1/img/bebidas.webp", ingredientes: "Leite, Sorvete de morango, Chantilly." },
            { id: 31, nome: "Cerveja", preco: 6.00, img: "https://mayconbrown.com.br/cardapio/1/img/bebidas.webp", ingredientes: "Malte, Lúpulo, Água." },
            { id: 32, nome: "Caipirinha", preco: 18.00, img: "https://mayconbrown.com.br/cardapio/1/img/bebidas.webp", ingredientes: "Cachaça, Limão, Açúcar, Gelo." },
            { id: 33, nome: "Suco de Melancia", preco: 8.00, img: "https://mayconbrown.com.br/cardapio/1/img/bebidas.webp", ingredientes: "Melancia, Açúcar (opcional)." },
            { id: 34, nome: "Refrigerante Diet", preco: 8.00, img: "https://mayconbrown.com.br/cardapio/1/img/bebidas.webp", ingredientes: "Água gaseificada, Adoçante, Corantes e aromatizantes." },
            { id: 35, nome: "Suco de Uva", preco: 9.00, img: "https://mayconbrown.com.br/cardapio/1/img/bebidas.webp", ingredientes: "Uva, Açúcar (opcional)." }
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
    // Só inclui a taxa de entrega na mensagem se ela for maior que zero
    if (taxaEntrega > 0) {
        mensagem += `\nTaxa de entrega: R$ ${taxaEntrega.toFixed(2)}\n`;
    }
        mensagem += `\nTotal: R$ ${totalElemento.textContent}\n`;

    if (formaPagamento === "Espécie") {
        const troco = valorPago - parseFloat(totalElemento.textContent);
        mensagem += `Pagamento: R$ ${valorPago.toFixed(2)}\n`;
        mensagem += `Troco: R$ ${troco.toFixed(2)}\n`;
    }

    mensagem += `Forma de Pagamento: ${formaPagamento}\n\n`;  // Forma de pagamento
    // Verificar se a entrega é retirada ou não
    const tipoEntrega = document.getElementById("tipo-entrega").value;
    if (tipoEntrega === "Retirada") {
        mensagem += `Pedido para Retirada no Local\n`;
    } else {
        // Adiciona o endereço apenas se for preenchido
        if (endereco) {
            mensagem += `\nEndereço: ${endereco}\n`;
        }
    }
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

// Função para ajustar o botão de instalação
let deferredPrompt;
const installButton = document.getElementById('install-button');

// Remove a mensagem de instalação para dispositivos móveis
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Exibe o botão de instalação logo abaixo da barra de menu
    installButton.style.display = 'block';
});

installButton.addEventListener('click', () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            deferredPrompt = null;
            installButton.style.display = 'none';
        });
    }
});
