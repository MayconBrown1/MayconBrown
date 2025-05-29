/**
 * Generate a printable receipt HTML
 */
export const generateReceiptHTML = (
  orderItems: any[],
  customer: any | null,
  total: number,
  paymentMethod: string,
  amountPaid: number,
  change: number,
  date: Date
): string => {
  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const itemsHTML = orderItems
    .map(
      (item) => `
      <tr>
        <td>${item.product.name}</td>
        <td>${item.quantity} ${item.product.saleType === 'weight' ? 'kg' : 'un'}</td>
        <td>${formatter.format(item.product.price)}</td>
        <td>${formatter.format(item.product.price * item.quantity)}</td>
      </tr>
    `
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Comprovante de Compra</title>
      <style>
        body {
          font-family: 'Courier New', Courier, monospace;
          width: 80mm;
          margin: 0 auto;
          padding: 5mm;
          font-size: 12px;
        }
        .header, .footer {
          text-align: center;
          margin-bottom: 10px;
        }
        .store-name {
          font-size: 16px;
          font-weight: bold;
        }
        .divider {
          border-top: 1px dashed #000;
          margin: 10px 0;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          text-align: left;
          padding: 3px 0;
        }
        .amount {
          text-align: right;
        }
        .total {
          font-weight: bold;
        }
        .customer-info {
          margin: 10px 0;
        }
        .payment-info {
          margin: 10px 0;
        }
        .thank-you {
          text-align: center;
          margin-top: 20px;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="store-name">CAIXABROWN</div>
        <div>CNPJ: 00.000.000/0000-00</div>
        <div>Rua Exemplo, 123 - Cidade/UF</div>
        <div>Tel: (00) 0000-0000</div>
      </div>
      
      <div class="divider"></div>
      
      <div>
        <div>CUPOM FISCAL</div>
        <div>Data: ${formattedDate}</div>
      </div>
      
      ${
        customer
          ? `
      <div class="customer-info">
        <div>Cliente: ${customer.name}</div>
        <div>CPF/CNPJ: ${customer.document}</div>
        ${customer.phone ? `<div>Telefone: ${customer.phone}</div>` : ''}
        ${customer.email ? `<div>Email: ${customer.email}</div>` : ''}
      </div>
      `
          : ''
      }
      
      <div class="divider"></div>
      
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Qtd</th>
            <th>Preço</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHTML}
        </tbody>
      </table>
      
      <div class="divider"></div>
      
      <div class="payment-info">
        <table>
          <tr>
            <td>TOTAL</td>
            <td class="amount total">${formatter.format(total)}</td>
          </tr>
          <tr>
            <td>Forma de Pagamento</td>
            <td class="amount">${
              {
                cash: 'Dinheiro',
                credit: 'Cartão de Crédito',
                debit: 'Cartão de Débito',
                pix: 'PIX',
                boleto: 'Boleto',
              }[paymentMethod] || paymentMethod
            }</td>
          </tr>
          ${
            paymentMethod === 'cash'
              ? `
          <tr>
            <td>Valor Pago</td>
            <td class="amount">${formatter.format(amountPaid)}</td>
          </tr>
          <tr>
            <td>Troco</td>
            <td class="amount">${formatter.format(change)}</td>
          </tr>
          `
              : ''
          }
        </table>
      </div>
      
      <div class="divider"></div>
      
      <div class="thank-you">
        Obrigado pela Preferência!
      </div>
    </body>
    </html>
  `;
};

/**
 * Print the receipt
 */
export const printReceipt = (receiptHTML: string): void => {
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(receiptHTML);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
    };
  }
};