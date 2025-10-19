// background.js

// Intervalos padrão (minutos)
const PADRAO = {
  agua: 30,
  postura: 20,
  comer: 120
};

function criarNotificacao(id, titulo, mensagem, icon) {
  chrome.notifications.create(id, {
    type: "basic",
    iconUrl: icon,
    title: titulo,
    message: mensagem,
    priority: 2
  });
}

async function configurarAlarmes() {
  const prefs = await chrome.storage.sync.get(PADRAO);

  chrome.alarms.clearAll();

  chrome.alarms.create("agua", { periodInMinutes: prefs.agua });
  chrome.alarms.create("postura", { periodInMinutes: prefs.postura });
  chrome.alarms.create("comer", { periodInMinutes: prefs.comer });
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set(PADRAO);
  configurarAlarmes();
});

chrome.runtime.onStartup.addListener(configurarAlarmes);
chrome.storage.onChanged.addListener(configurarAlarmes);

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "agua") {
    criarNotificacao("agua_" + Date.now(), "Hora da água 💧", "Beba um copo d'água agora!", "icons/water.png");
  } else if (alarm.name === "postura") {
    criarNotificacao("postura_" + Date.now(), "Postura 💺", "Ajeite-se na cadeira e relaxe os ombros.", "icons/posture.png");
  } else if (alarm.name === "comer") {
    criarNotificacao("comer_" + Date.now(), "Lanche 🥪 ", "Faça uma pausa rápida e coma algo saudável.", "icons/food.png");
  }
});
