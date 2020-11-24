const express = require ('express');
const app = express();
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');
const clienteRoutes = require ('./rotas/clientes');

const path = require ('path');


/*
mongoose.connect('mongodb+srv://fluzao:fluzao@cluster0.gtz4k.mongodb.net/app-fluzao?retryWrites=true&w=majority')
.then(() => {
  console.log ("Conexão OK")
  }).catch(() => {
  console.log("Conexão NOK")
  });
*/
mongoose.connect('mongodb+srv://fluzao:fluzao@cluster0.gtz4k.mongodb.net/app-fluzao?retryWrites=true&w=majority');

app.use (bodyParser.json());

app.use('/imagens', express.static(path.join("backend/imagens")));



  app.use ((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
    next();
    });

    app.use ('/api/clientes', clienteRoutes);

module.exports = app;
