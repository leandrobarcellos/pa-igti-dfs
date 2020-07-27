const catequizando = "catequizando";
const mockDb = require("./mockdb");

mockDb.initDB(catequizando);

const remove = (id) => {
  mockDb.remove(catequizando, id);
}

const persist = (value) => {
  return mockDb.persist(catequizando, value);
}

const merge = (value) => {
  mockDb.merge(catequizando, value);
}

const find = (id) => {
  return mockDb.find(catequizando, id);
}

const getData = () => {
  return mockDb.getData(catequizando);
}

exports.remove = remove;
exports.merge = merge;
exports.persist = persist;
exports.find = find;
exports.getData = getData;