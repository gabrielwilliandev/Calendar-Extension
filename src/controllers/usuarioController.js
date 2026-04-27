const UsuarioService = require('../service/UsuarioService.js');

class UsuarioController{
    static async cadastrar(req, res){
        try{
            const usuarioSalvo = await UsuarioService.cadastrar(req.body);

            return res.status(201).json({
                mensagem: "Usuario cadastrado com sucesso!",
                usuario: {
                    id: usuarioSalvo.id,
                    nome: usuarioSalvo.nome,
                    email: usuarioSalvo.email,
                    data_cadastro: usuarioSalvo.data_cadastro
                }
            });
        } catch (error){
            console.error("Erro no cadastro de usuário:", error.message);
            return res.status(400).json({erro: error.message})
        }
    }
    static async login(req, res){
        try{
            const { email, senha} = req.body;

            const dadosLogin = await UsuarioService.login(email, senha);

            return res.status(200).json(dadosLogin);
        }
        catch (error){
            console.error("Erro no login de usuário: ", error.message);

            return res.status(401).json({erro: error.message});
        }
    }
}

module.exports = UsuarioController;