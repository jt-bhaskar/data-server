const {saveTestResult} = require("../controllers/test.controller");

const router = require("express").Router();

// Submit test result
router.post('/', saveTestResult)

module.exports = router