// src/entities/Notificacao.js
class NotificacaoEntitie {
  constructor({ mensagem, data_envio, idTarefa, idUsuario }) {
    this.mensagem = mensagem;
    this.data_envio = data_envio; 
    this.idTarefa = idTarefa;     
    this.idUsuario = idUsuario;
    this.data_criacao = new Date(); 

    this.validar();
  }

  validar() {
    if (!this.mensagem) throw new Error("A mensagem da notificação é obrigatória.");
    if (!this.data_envio) throw new Error("A data de envio da notificação deve ser definida.");
    if (!this.idTarefa) throw new Error("Toda notificação precisa estar vinculada a uma tarefa.");
    if (!this.idUsuario) throw new Error("Toda notificação precisa pertencer a um usuário.");
  }
}

module.exports = NotificacaoEntitie;