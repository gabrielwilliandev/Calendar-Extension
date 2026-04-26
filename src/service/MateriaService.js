const MateriaEntitie = require('../entities/MateriaEntitie');
const MateriaRepository = require('../repositories/MateriaRepository.js');

class MateriaService {
    static async cadastrar(dadosMateria) {
        const novaMateria = new MateriaEntitie(dadosMateria);
        
        return await MateriaRepository.salvar(novaMateria);
    }

    static async listarPorUsuario(idUsuario) {
        if (!idUsuario) {
            throw new Error("Não é possível buscar matérias sem identificar o usuário.");
        }
        
        return await MateriaRepository.buscarPorUsuario(idUsuario);
    }
}

module.exports = MateriaService;