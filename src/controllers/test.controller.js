const Ajv = require('ajv');
const {saveResultSchema} = require("../data/network/model/test.schema");
const {insertUser} = require("../data/local/models/model.user");
const {insertSubmission} = require("../data/local/models/model.result");
const {saveToSheet} = require("../data/network/google_sheets");
const ajv = new Ajv();

async function saveTestResult(req, res) {
    const validate = ajv.compile(saveResultSchema)
    const valid = validate(req.body)
    try {
        if(valid) {
            const user = await insertUser({name : req.body.name, city : req.body.city, email: req.body.email, gender: req.body.gender, mobile: req.body.mobile, has_consent : req.body.has_consent})
            console.log(user.dataValues)
            const test_submission = await insertSubmission({submission: req.body.response, uid: user.uuid})
            console.log(test_submission)
            try {
                await saveToSheet(req.body)
            } catch (e) {
                console.log("ERROR: Unable to insert data in the sheet")
            }
            return res.status(200).send({'status' : 'Success', 'id': user.dataValues.uuid})
        } else {
            return res.status(400).json({
                status: 'Error',
                message: 'Invalid request body',
            });
        }
    } catch (e) {
        if(e.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                status: 'Error',
                message: 'User Already Exist',
            });
        } else {
            return res.status(500).json({
                status: 'Error',
                message: 'Unexpected Error',
            });
        }
    }
}

module.exports = {
    saveTestResult
}