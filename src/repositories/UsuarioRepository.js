const supabase = require('../config/supabase');
// salva o usuario na autenticacao e no banco
class UsuarioRepository {
    static async salvar(usuarioEntity) {
        let authUserId = null;

        try {
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: usuarioEntity.email,
                password: usuarioEntity.senha
            });

            if (authError) throw authError;

            // Guardamos o ID para caso precisemos deletar depois
            authUserId = authData.user.id;

            const { data, error: profileError } = await supabase
                .from('usuarios')
                .insert([
                    {
                        id: authUserId,
                        nome: usuarioEntity.nome,
                        email: usuarioEntity.email,
                        data_cadastro: usuarioEntity.data_cadastro
                    }
                ])
                .select()
                .single();

            if (profileError) throw profileError;

            return data;

        } catch (error) {
            // SE ALGO FALHOU E O USUÁRIO JÁ TINHA SIDO CRIADO NO AUTH:
            if (authUserId) {
                await supabase.auth.admin.deleteUser(authUserId);
            }

            throw new Error(`Erro no processo de cadastro: ${error.message}`);
        }
    }
}

module.exports = UsuarioRepository;