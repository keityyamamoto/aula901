const express = require ('express');
const app = express();
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');
const Cliente = require ('./models/cliente');

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



  app.use ((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
    next();
    });

    // busca todos os clientes.
    app.get('/api/clientes', (req, res, next) => {
      Cliente.find().then(documents => {
        console.log(documents)
      res.status(200).json({
      mensagem: "Tudo OK",
      clientes: documents
      });
      })
      });

      // adicionando um cliente.
  app.post ('/api/clientes', (req, res, next) => {
    const cliente = new Cliente({
      nome: req.body.nome,
      fone: req.body.fone,
      email: req.body.email
      })
      cliente.save().
      then (clienteInserido => {
        res.status(201).json({
        mensagem: 'Cliente inserido',
        id: clienteInserido._id
        })
      })
  });

 // removendo um cliente
  app.delete ('/api/clientes/:id', (req, res, next) => {
    Cliente.deleteOne ({_id: req.params.id}).then((resultado) => {
      console.log (req.params);
      res.status(200).json({mensagem: "Cliente removido"})
    });
  });

  // atualizando um cliente
  app.put ("/api/clientes/:id", (req, res, next) => {
    const cliente = new Cliente({
    _id: req.params.id,
    nome: req.body.nome,
    fone: req.body.fone,
    email: req.body.email
    });
    Cliente.updateOne({_id: req.params.id}, cliente)
    .then ((resultado) => {
    console.log (resultado)
    });
    res.status(200).json({mensagem: 'Atualização realizada com sucesso'})
    });

    app.get('/api/clientes/:id', (req, res, next) => {
      Cliente.findById(req.params.id).then(cli => {
      if (cli){
      res.status(200).json(cli);
      }
      else
      res.status(404).json({mensagem: "Cliente não encontrado!"})
      })
      });


module.exports = app;
