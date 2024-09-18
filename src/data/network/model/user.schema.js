const userExistSchema = {
    type: 'object',
    properties: {
        mobile: { type: 'string' },
        email: { type: 'string' }
    },
    required : ['mobile','email'],
    additionalProperties: false
};

module.exports = {
    userExistSchema
}