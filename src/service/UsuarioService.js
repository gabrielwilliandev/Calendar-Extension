const UsuarioEntite = require('../entities/UsuarioEntitie');
const UsuarioRepository = require('../repositories/UsuarioRepository.js');

class UsuarioService{
    static async cadastrar(dadosUsuario){
        const novoUsuario = new UsuarioEntite(dadosUsuario);
        const usuarioSalvo = await UsuarioRepository.salvar(novoUsuario);

        return usuarioSalvo;
    }
    static async buscarPerfil(email){
        if(!email) throw new Error("O email é obrigatório para busca.");
        return await UsuarioRepository.buscarPorEmail(email);
    }
}
module.exports = UsuarioService;