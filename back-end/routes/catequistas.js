var express = require('express');
var router = express.Router();
const service = require("../public/javascripts/features/catequistas/catequista.service")
const utilRoutes = require("./util.routes")

/* GET users listing. */
router.delete('/:id', function (req, res, next) {
  utilRoutes.doRemove(req, res, (id) => service.remove(id));
});

router.post('/', function (req, res, next) {
  utilRoutes.doPersist(req, res, (val) => service.persist(val), "Catequista incluído com sucesso.");
});

router.get('/', function (req, res, next) {
  utilRoutes.doSendOk(res, service.getData(), `Consulta realizada com sucesso.`);
});

router.get('/:id', function (req, res, next) {
  utilRoutes.doFindById(req, res, (id) => service.find(id), ``);
});

router.put('/', function (req, res, next) {
  utilRoutes.doMerge(req, res, (val) => service.merge(val), `Atualização realizada com sucesso.`);
});

module.exports = router;
