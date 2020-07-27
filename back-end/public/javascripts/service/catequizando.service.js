const repository = require("../repository/catequizando.repository");

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

exports.remove = remove;
exports.merge = merge;
exports.persist = persist;
exports.find = find;
exports.getData = getData;