let creditos = localStorage.getItem("creditos");
let codigosUsados = JSON.parse(localStorage.getItem("codigosUsados")) || [];

// CÓDIGOS MANUAIS VÁLIDOS
const codigosValidos = {
  "Russo71": 20,
  "REC-10-20B": 20,
  "REC-10-20C": 20
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
    alert("Seus créditos acabaram.");
    return;
  }

  creditos--;
  localStorage.setItem("creditos", creditos);
  atualizarTela();
  window.print();
}

function ativarCodigo() {
  const codigo = document.getElementById("codigo").value;

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
