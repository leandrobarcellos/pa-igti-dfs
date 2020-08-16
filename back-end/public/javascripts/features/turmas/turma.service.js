const repository = require("./turma.repository");

const find = (id) => {
  return repository.find(id);
}
const merge = (value) => {
  return repository.merge(value);
}
const persist = (value) => {
  return repository.persist(value);
}
const remove = (id) => {
  return repository.remove(id);
}

const getData = () => {
  return repository.getData();
}

const getTiposTurma = () => {
  return repository.TiposTurma;
}


exports.getTiposTurma = getTiposTurma;
exports.remove = remove;
exports.merge = merge;
exports.persist = persist;
exports.find = find;
exports.getData = getData;