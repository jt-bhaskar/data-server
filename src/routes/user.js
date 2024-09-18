const {checkIfUserExist} = require("../controllers/user.controller");

const router = require("express").Router();

// Check if user exist
router.get('/exist', checkIfUserExist)

module.exports = router