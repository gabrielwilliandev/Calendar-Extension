const express = require('express')
exports.listarUsuarios = (req, res) => {
    res.json([
        {nome: 'TESTE'}
    ])
};