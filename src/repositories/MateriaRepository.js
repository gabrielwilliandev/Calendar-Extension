const supabase = require('../config/supabase');
// salva a materia no banco
class MateriaRepository{
    static async salvar(materiaEntity){
        const {data, error} = await supabase
        .from('materias')
        .insert([
            {
                nome: materiaEntity.nome,
                user_id: materiaEntity.idUsuario
            }
        ])
        .select()
        .single();

        if(error) throw new Error(`Erro ao salvar matéria: ${error.message}`);
        return data;
    }

    static async buscarPorUsuario(userId) {
    const { data, error } = await supabase
      .from('materias')
      .select('*')
      .eq('user_id', userId);

    if (error) throw new Error(error.message);
    return data;
  }
}

module.exports = MateriaRepository;