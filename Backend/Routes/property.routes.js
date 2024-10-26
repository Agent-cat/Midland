const express = require("express");
const router = express.Router();
const {
  postproperty,
  getallproperties,
  updateproperty,
  deleteproperty,
  getpropertybyid,
} = require("../controllers/property.controller.js");

router.post("/", postproperty);
router.get("/", getallproperties);
router.get("/:id", getpropertybyid);
router.put("/:id", updateproperty);
router.delete("/:id", deleteproperty);

module.exports = router;
