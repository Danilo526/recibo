let creditos = localStorage.getItem("creditos");
let codigosUsados = JSON.parse(localStorage.getItem("codigosUsados")) || [];

// CÓDIGOS MANUAIS VÁLIDOS (AJUSTE AQUI)
const codigosValidos = {
  "RBAYSD": 10,
  "MIAYTS": 10,
  "MIUNSA": 10,
  "OAMSDR": 10,
  "BAUSBY": 10,
  "ECAFTX": 10
};

if (creditos === null) {
  creditos = 5;
  localStorage.setItem("creditos", creditos);
}

creditos = parseInt(creditos);
atualizarTela();

function atualizarTela() {
  document.getElementById("creditos").innerText = creditos;
}

function gerarRecibo() {
  if (creditos <= 0) {
    alert(
      "Seus créditos acabaram.\n" +
      "Cada recibo custa R$1.\n" +
      "Compre créditos via WhatsApp."
    );
    return; // 🚨 PARA A FUNÇÃO AQUI
  }

  creditos--;
  localStorage.setItem("creditos", creditos);
  atualizarTela();

  window.print();
}

function ativarCodigo() {
  const codigo = document.getElementById("codigo").value.trim();

  if (!codigosValidos[codigo]) {
    alert("Código inválido.");
    return;
  }

  if (codigosUsados.includes(codigo)) {
    alert("Este código já foi usado.");
    return;
  }

  creditos += codigosValidos[codigo];
  codigosUsados.push(codigo);

  localStorage.setItem("creditos", creditos);
  localStorage.setItem("codigosUsados", JSON.stringify(codigosUsados));

  atualizarTela();
  alert("Créditos liberados!");
}
