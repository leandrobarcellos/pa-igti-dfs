const catequista = "catequista";
const mockDb = require("../../repository/mockdb");

mockDb.initDB(catequista);

const remove = (id) => {
  mockDb.remove(catequista, id);
}

const persist = (value) => {
  return mockDb.persist(catequista, value);
}

const merge = (value) => {
  mockDb.merge(catequista, value);
}

const find = (id) => {
  return mockDb.find(catequista, id);
}

const getData = () => {
  return mockDb.getData(catequista);
}

exports.remove = remove;
exports.merge = merge;
exports.persist = persist;
exports.find = find;
exports.getData = getData;
