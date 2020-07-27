var express = require('express');
var router = express.Router();
const service = require("../public/javascripts/service/catequizando.service")

/* GET users listing. */
router.delete('/:id', function (req, res, next) {
  try {
    console.log(`Removendo entidade identificada por ${req.params.id}...`);
    service.remove(req.params.id);
    console.log(`Exclusão realizada com sucesso.`);
    res.send(`Exclusão realizada com sucesso.`);
  } catch (error) {
    console.log(`Erro ao tentar excluir ${req.params.id}.`);
    res.sendStatus(error);
  }
});

router.post('/', function (req, res, next) {
  try {
    console.log(`Persistindo nova entidade`);
    let value = req.body;
    service.persist(value);
    console.log(`Entidade persistida: ${value}.`);
  } catch (error) {
    console.log(`Erro ao tentar persistir`);
    res.sendStatus(error);
  }
  res.send("Catequizando incluído com sucesso.");
});

router.get('/', function (req, res, next) {
  res.header({"Content-type": "application/json"});
  res.send(service.getData());
});

router.get('/:id', function (req, res, next) {
  try {
    res.header({"Content-type": "application/json"});
    res.send(service.find(req.params.id));
  } catch (error) {
    res.sendStatus(error);
  }
});

router.put('/', function (req, res, next) {
  try {
    console.log(`Atualiando entidade`);
    let value = req.body;
    service.merge(value);
    console.log(`Entidade atualizada: ${value}.`);
  } catch (error) {
    console.log(`Erro ao tentar atualizar`);
    res.sendStatus(error);
  }
  res.header({"Content-type": "application/json"});
  res.send("Catequizando atualizado com sucesso.");
});


module.exports = router;
