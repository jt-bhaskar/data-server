const {checkIfUserExist, getTotalUser} = require("../controllers/user.controller");

const router = require("express").Router();

// Check if user exist
router.get('/exist', checkIfUserExist)

router.get('/totalcount', getTotalUser)

module.exports = router