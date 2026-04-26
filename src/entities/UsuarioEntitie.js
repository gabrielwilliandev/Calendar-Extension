class UsuarioEntitie{
    constructor({nome, email, senha}) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.data_cadastro = new Date();
        
        this.validar();
    }

    validar(){
        if(!this.nome || !this.email || !this.senha){
            throw new Error("Nome, email e senha são obrigatórios!");
        }
        if(!this.email.includes('@')){
            throw new Error("O email fornecido é inválido!");
            
        }
    }
}

module.exports = UsuarioEntitie;