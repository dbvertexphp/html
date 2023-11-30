const { PhonePeCallbackHandler } = require("../Controllers/PhonePe.controller");

const PhonepeRouter = require("express").Router();


PhonepeRouter.post("/handle-response", PhonePeCallbackHandler)

module.exports = PhonepeRouter;