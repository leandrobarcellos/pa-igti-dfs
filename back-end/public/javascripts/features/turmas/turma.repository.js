const turma = "turma";
const mockDb = require("../../repository/mockdb");
mockDb.initDB(turma);

const remove = (id) => {
  mockDb.remove(turma, id);
}

const persist = (value) => {
  return mockDb.persist(turma, value);
}

const merge = (value) => {
  mockDb.merge(turma, value);
}

const find = (id) => {
  return mockDb.find(turma, id);
}

const getData = () => {
  return mockDb.getData(turma);
}

const TiposTurma = [
  {"PE": "Pré-Eucaristia"},
  {"EU": "Eucaristia"},
  {"PR": "Perseverança"},
  {"CR": "Crisma"}
];

exports.TiposTurma = TiposTurma;
exports.remove = remove;
exports.merge = merge;
exports.persist = persist;
exports.find = find;
exports.getData = getData;
