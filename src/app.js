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

const usuarioRoutes = require('./routes/usuarioRoutes');

app.use('/usuarios', usuarioRoutes);
app.listen(3000, () => console.log('Servidor rodando'));