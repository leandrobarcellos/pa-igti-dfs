
const myMock = {};

const initDB = (entity) =>{
    myMock[entity] = {sq: 0, data: []};
};

const generateId =(entity)=> {
    return myMock[entity].sq++;
};

const push = (entity, value)=>{
    myMock[entity].data.push(value);
};

const spliceFromData = (entity, index) => {
    myMock[entity].data.splice(index, 1);
}

const getData = (entity)=>{
    console.log(`Retornando informações de: ${entity}`);
    console.log(`Data: ${JSON.stringify(myMock[entity].data)}`);
    return myMock[entity].data;
};

const persist = (entity, value)=>{
    try{
        console.log("Persistindo entidade: ");
        console.log(entity);
        id = generateId(entity);
        value.id = id;
        push(entity, value);
        return true;
    }catch {
        return false;
    }
};

const merge =(entity, value) => {
    let data = getData(entity);
    if(!data){
        return;
    }
    let index = 0;
    let found = null;
    if (value.id) {
        while (null == found && index < data.length) {
            if(value.id == data[index].id){
                found = data[index];
            }else{
                index++;
            }
        }
        if(found){
            spliceFromData(entity,index);
            push(entity, value);
        } else {
            throw 404;
        }
    } else {
        throw 404;
    }
};

const remove =(entity, id) => {
    let data = getData(entity);
    if(!data){
        return;
    }
    let index = 0;
    let found = null;
    if (id) {
        while (null == found && index < data.length) {
            if(id == data[index].id){
                found = data[index];
            }else{
                index++;
            }
        }
        console.log("passou!");
        if(found){
            spliceFromData(entity, index);
        } else {
            throw 404;
        }
    }
};

const find =(entity, id) => {
    let data = getData(entity);
    let found = data.find(v => v.id == id);
    if(!found){
        throw 404;
    }
    return found;
};

exports.initDB = initDB;
exports.getData = getData;
exports.persist = persist;
exports.merge = merge;
exports.remove = remove;
exports.find = find;
