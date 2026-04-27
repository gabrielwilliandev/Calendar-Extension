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
    static async login(email, senha){
        try{
            const {data: authData, error: authError} = await supabase.auth.signInWithPassword({
                email: email,
                password: senha
            });

            if(authError) throw new Error("Credenciais inválidas!");

            const { data: profileData, error: profileError} = await supabase
            .from('usuarios')
            .select('nome')
            .eq('id', authData.user.id)
            .single();

            if (profileError) console.warn("Aviso: Não foi possível localizar o perfil!");

            return{
                token: authData.session.access_token,
                usuario:{
                    nome: profileData ? profileData.nome : "Estudante"
                }
            };
            
        } catch (error){
            console.error("Erro detalhado do Supabase Auth:", error.message || error);
            throw new Error("Credenciais inválidas");
        }
    }
}

module.exports = UsuarioRepository;