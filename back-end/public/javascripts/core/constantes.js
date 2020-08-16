const doSendOk = (response, object, message) => {
  response.header({"Content-type": "application/json"});
  response.status(200).send({
    "object": object,
    "message": message
  });
};

const doSendOkMessage = (response, message) => {
  doSendMessage(response, 200, message);
};

const doSendMessage = (response, status, message) => {
  response.header({"Content-type": "application/json"});
  response.status(status).send({
    "message": message
  });
};

const doSend = (response, status, object, message) => {
  response.header({"Content-type": "application/json"});
  response.status(status).send({
    "object": object,
    "message": message
  });
};

const doSendError = (response, error, message) => {
  let status = 500;
  response.header({"Content-type": "application/json"});
  if (99 < error && 600 > error) {
    status = error;
  }
  doSendMessage(response, status, message);
};

exports.doSend = doSend;
exports.doSendError = doSendError;
exports.doSendMessage = doSendMessage;
exports.doSendOk = doSendOk;
exports.doSendOkMessage = doSendOkMessage;