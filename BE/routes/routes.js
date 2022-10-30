const express = require("express");
const router = express.Router();
const controllerCrud = require("../modules/index");

router.get("/get", controllerCrud.getall);
router.post("/create", controllerCrud.createDemo);
router.post("/createbyid/:id", controllerCrud.createbyid);
router.put("/update", controllerCrud.update);
// router.delete("/delete/:id", controllerCrud.deletes);
router.get("/getbyid/:id", controllerCrud.getById);

module.exports = router;
