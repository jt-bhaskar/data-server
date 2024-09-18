const Ajv = require('ajv');
const {userExistSchema} = require("../data/network/model/user.schema");
const {isUserExist, User, getTotalUserCount} = require("../data/local/models/model.user");
const ajv = new Ajv();

async function checkIfUserExist(req, res) {

    const validate = ajv.compile(userExistSchema)
    const data = req.query
    const valid = validate(data)
    try {
        if(valid) {
            const user = await isUserExist({email: data.email, mobile: data.mobile})
            if(user)
                return res.status(409).json({
                    status: 'Error',
                    message: 'User Already Exist',
                });

            return res.status(200).send({'status' : 'Success', message: "New user"})
        } else {
            return res.status(400).json({
                status: 'Error',
                message: 'Invalid request parameters',
            });
        }
    } catch (e) {
        return res.status(500).json({
            status: 'Error',
            message: 'Unexpected Error',
        });
    }
}

async function getTotalUser(req, res) {
    try {
        const total_user = await getTotalUserCount()
        return res.status(200).send({'status' : 'Success', total_user })
    } catch (e) {
        return res.status(500).json({
            status: 'Error',
            message: 'Unexpected Error',
        });
    }
}


module.exports = {
    checkIfUserExist,
    getTotalUser
}