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

    static async login(email, senha){
        if(!email || !senha){
            throw new Error("E-mail e senha são obrigatórios para realizar o login.");
        }
        return await UsuarioRepository.login(email, senha);
    }
}
module.exports = UsuarioService;