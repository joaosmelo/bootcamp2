const campos = {
  agua: document.getElementById("agua"),
  postura: document.getElementById("postura"),
  comer: document.getElementById("comer")
};

async function carregar() {
  const dados = await chrome.storage.sync.get({ agua: 30, postura: 20, comer: 120 });
  campos.agua.value = dados.agua;
  campos.postura.value = dados.postura;
  campos.comer.value = dados.comer;
}

document.getElementById("salvar").addEventListener("click", async () => {
  await chrome.storage.sync.set({
    agua: parseInt(campos.agua.value),
    postura: parseInt(campos.postura.value),
    comer: parseInt(campos.comer.value)
  });
  alert("Configurações salvas!");
});

carregar();
