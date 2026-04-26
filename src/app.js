/*
    ---- INSTALAÇÕES ----
    Instale o nvm: https://github.com/coreybutler/nvm-windows/releases (Intale o nvm-setup.exe)
    Instale o node v24.14.0 na sua máquina: 
        nvm install 24.14.0 
        nvm use 24.14.0
    



*/

// Server: é o cérebro da api
const express = require('express');
const app = express();
const path = require('path') // 

const usuarioRoutes = require('./routes/usuarioRoutes');

// Ligação com o front end
app.use(express.static(path.join(__dirname, '../public')));

app.use('/usuarios', usuarioRoutes);
const PORTA = 3000; 
app.listen(PORTA, () => console.log('Servidor rodando. Porta: '+ PORTA));