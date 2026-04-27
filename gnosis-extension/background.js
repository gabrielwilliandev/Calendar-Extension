// background.js

const API_BASE_URL = 'http://localhost:3000/api';
const ALARM_NAME = 'checkGnosisTasks';

// Instalação da extensão
chrome.runtime.onInstalled.addListener(() => {
    console.log("[Gnosis Oracle] Service Worker instalado e pronto.");
});

// Escuta mensagens do popup.js (Login e Logout)
chrome.runtime.onMessage.addListener((mensagem, sender, sendResponse) => {
    if (mensagem.acao === "INICIAR_MONITORAMENTO") {
        
        chrome.alarms.create(ALARM_NAME, { periodInMinutes: 30 });
        console.log("[Gnosis Oracle] Monitoramento ativado. Alarme configurado.");
        
        checarTarefasPendentes();
        sendResponse({ status: "Monitoramento ativado" });
        
    } else if (mensagem.acao === "PARAR_MONITORAMENTO") {
        
        chrome.alarms.clear(ALARM_NAME);
        chrome.storage.local.remove(['tarefas_notificadas']);
        console.log("[Gnosis Oracle] Monitoramento parado.");
        
        sendResponse({ status: "Monitoramento parado" });
    }
    
    return true; 
});

// O "Despertador" do Chrome
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === ALARM_NAME) {
        checarTarefasPendentes();
    }
});

// Lógica de consumo da API em background
async function checarTarefasPendentes() {
    try {
        const data = await chrome.storage.local.get(['gnosis_token', 'tarefas_notificadas']);
        const token = data.gnosis_token;
        let notificadas = data.tarefas_notificadas || [];

        if (!token) return; 

        const response = await fetch(`${API_BASE_URL}/tarefas`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) throw new Error("Falha ao comunicar com a API");

        const tarefas = await response.json();
        const pendentes = tarefas.filter(t => t.status !== 'feita');

        pendentes.forEach(tarefa => {
            if (!notificadas.includes(tarefa.id)) {
                dispararNotificacao(tarefa);
                notificadas.push(tarefa.id);
            }
        });

        await chrome.storage.local.set({ 'tarefas_notificadas': notificadas });

    } catch (error) {
        console.error("[Gnosis Oracle] Erro no Service Worker:", error);
    }
}

// Criação do Balão Nativo do Sistema Operacional
function dispararNotificacao(tarefa) {
    let prazoFormatado = "Sem prazo definido";
    if (tarefa.data_entrega) {
        prazoFormatado = new Date(tarefa.data_entrega).toLocaleDateString('pt-BR');
    }

    const disciplina = tarefa.disciplina ? tarefa.disciplina.toUpperCase() : "GNOSIS ORACLE";

    chrome.notifications.create({
        type: "basic",
        iconUrl: "icon.png", 
        title: disciplina,
        message: `${tarefa.titulo}\nPrazo: ${prazoFormatado}`,
        priority: 2,
        requireInteraction: true 
    });
}