const express = require ('express');
const app = express();
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');
const Cliente = require ('./models/cliente');


mongoose.connect('mongodb+srv://fluzao:fluzao@cluster0.gtz4k.mongodb.net/app-fluzao?retryWrites=true&w=majority')
.then(() => {
  console.log ("Conexão OK")
  }).catch(() => {
  console.log("Conexão NOK")
  });

app.use (bodyParser.json());



  app.use ((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
    });

    app.get('/api/clientes', (req, res, next) => {
      Cliente.find().then(documents => {
      res.status(200).json({
      mensagem: "Tudo OK",
      clientes: documents
      });
      })
      });

  app.post ('/api/clientes', (req, res, next) => {
    const cliente = new Cliente({
      nome: req.body.nome,
      fone: req.body.fone,
      email: req.body.email
      })
      cliente.save();
    console.log(cliente);
    res.status(201).json({mensagem: 'Cliente inserido'})
  });

module.exports = app;
