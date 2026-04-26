const express = require('express');
const path = require('path') // 

// const usuarioRoutes = require('./routes/usuarioRoutes');
const tarefaRoutes = require('./routes/tarefaRoutes')
const app = express();

app.use(express.json());

// Ligação com o front end
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/tarefas', tarefaRoutes)

// app.use('/usuarios', usuarioRoutes);

// Rota de saúde só para garantir que o Express não quebrou ao iniciar
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'Servidor no ar!' });
});


const PORT = 3000; 
app.listen(PORT, () => {
    console.log(`🚀 Servidor de testes rodando na porta ${PORT}`);
    console.log(`🔗 Health Check: http://localhost:${PORT}/api/health`);
});

module.exports = app;