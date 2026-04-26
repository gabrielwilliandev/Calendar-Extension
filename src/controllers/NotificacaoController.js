const NotificacaoService = require('../services/NotificacaoService.js');

class NotificacaoController {
    static async criar(req, res) {
        try {
            const notificacaoSalva = await NotificacaoService.criar(req.body);

            return res.status(201).json({
                mensagem: "Notificação agendada com sucesso!",
                notificacao: notificacaoSalva
            });
        } catch (error) {
            console.error("Erro ao criar notificação:", error.message);
            return res.status(400).json({ erro: error.message });
        }
    }
}

module.exports = NotificacaoController;