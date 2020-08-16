const constantes = require("../public/javascripts/core/constantes")

const doSendOk = (res, value, message) => {
  constantes.doSendOk(res, value, message);
}

const doMerge = (req, res, callback, successMsg) => {
  try {
    console.log(`Atualizando entidade`);
    let value = req.body;
    callback(value)
    console.log(`Entidade atualizada: ${value}.`);
    constantes.doSendOk(res, value, "Catequista atualizado com sucesso.");
  } catch (error) {
    console.log(`Erro ao tentar atualizar`);
    constantes.doSendError(res, `Erro ao tentar atualizar`);
  }
}

const doRemove = (req, res, callback) => {
  try {
    console.log(`Removendo entidade por id: ${req.params.id}...`);
    callback(req.params.id);
    console.log(`Exclusão de entidade com sucesso.`);
    constantes.doSend(res, 200, null, `Exclusão realizada com sucesso.`);
  } catch (error) {
    console.log(`Erro ao tentar excluir ${req.params.id}.`);
    constantes.doSendError(res, error, `Erro ao tentar excluir.`);
  }
}

const doPersist = (req, res, callback, successMsg) => {
  try {
    console.log(`Persistindo entidade`);
    let value = req.body;
    callback(value);
    console.log(`Entidade persistida.`);
    constantes.doSend(res, 200, value, successMsg);
  } catch (error) {
    console.log(`Erro ao tentar persistir`);
    constantes.doSendError(res, error, `Erro ao tentar persistir.`);
  }
}

const doFindById = (req, res, callback, successMsg) => {
  try {
    let found = callback(req.params.id);
    constantes.doSendOk(res, found, successMsg);
  } catch (error) {
    constantes.doSendError(res, error, "Erro ao localizar catequista.");
  }
}

exports.doSendOk = doSendOk;
exports.doMerge = doMerge;
exports.doRemove = doRemove;
exports.doPersist = doPersist;
exports.doFindById = doFindById;
