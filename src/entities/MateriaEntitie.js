class MateriaEntitie{
    constructor({nome, idUsuario}) {
        this.nome = nome;
        this.idUsuario = idUsuario;
        this.data_cadastro = new Date();
        
        this.validar();
    }

    validar(){
        if(!this.nome) throw new Error("O nome da matéria é obrigatório.");
        if(!this.idUsuario) throw new Error("A matéria deve pertencer a um usuário.");
    }
}
module.exports = MateriaEntitie;