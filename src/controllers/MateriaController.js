const MateriaService = require('../service/MateriaService.js');

class MateriaController{
    static async cadastrar(req, res){
        try{
            const materiaSalva = await MateriaService.cadastrar(req.body);

            return res.status(201).json({
                mensagem: "Matéria cadastrada com sucesso!",
                materia: materiaSalva
            });
        } catch (error){
            console.error("Erro ao cadastrar matéria:", error.message);
            return res.status(400).json({ erro: error.message });
        }
    }

    static async listar(req, res){
        try {
            const { idUsuario } = req.params;
            
            const materias = await MateriaService.listarPorUsuario(idUsuario);
            return res.status(200).json(materias);
        } catch (error) {
            console.error("Erro ao listar matérias:", error.message);
            return res.status(400).json({ erro: error.message });
        }
    }
}
module.exports = MateriaController;